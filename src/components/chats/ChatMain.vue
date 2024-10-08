<template>
  <div class="chat-main" v-if="chat">
    <div class="chat-header">
      <ChatMainHeadder @update-chat-status='updateChatStatus' :statuses="statuses" :chat="chat" @click-notes="notesModal"/>
    </div>
    <div class="messages-list" id="messages-list" @scroll="handleScroll">
      <div v-if="loading" class="loader"></div>

      <Message 
        v-for="(message, idx) in messages" 
        :key="message.id" 
        :message="message"
        :previous_user_id="getPreviousMessageUserId(idx)"
      />
    </div>
    <div class="message-input">
      <textarea
        type="text" 
        v-model="new_message" 
        @keyup.enter="handleEnter"
        placeholder="Escribe un mensaje..."
        :disabled="chat.time_left == 0"
      />
      <label 
        @mouseover="hoverFileInput" @mouseout="fileInputClass = 'fa-solid fa-paperclip icon-file'"
        :class="`file-input-label ${selectedFile ? 'icon-file-selected' : ''}`"
        @click="handleLabelClick"
      >
      <i :class="fileInputClass" ></i>
        <input 
          v-if="!selectedFile"
          type="file" 
          ref="fileInput"
          @change="handleFileChange"
          :disabled="chat.time_left == 0"
        />
      </label>
      <button class="send-button" :disabled="chat.time_left==0" @click="sendMessage">Enviar</button>
    </div>

    <div v-if="showNotesModal" class="modal-overlay" @click.self="showNotesModal = false">
      <div class="modal">
        <h2>Notas</h2>
        <div class="note-input-container">
          <textarea type="text" v-model="newNote" placeholder="Añadir nota..." class="note-input"/>
          <button @click="createNote" class="add-note-button">+</button>
        </div>
        <div class="notes-list">
          <div v-for="(note, index) in notes" :key="index" class="note">
            <div class="note-content">
              <div class="note-header">{{ note.username }}</div>
              <div class="note-body">{{ note.note }}</div>
            </div>
            <button class="note-delete" @click="deleteNote(note.id)"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
        <button @click="showNotesModal = false">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { chatMessages, sendMessage } from '@/routes/chats';
import { getMessage } from '@/routes/messages';
import Message from './Message.vue';
import ChatMainHeadder from './ChatMainHeadder.vue';
import { createNote, getChatNotes, deleteNote } from '@/routes/chat_notes';

export default {
  name: "ChatMain",
  components: {
    Message,
    ChatMainHeadder
  },
  props: ['chat', 'statuses'],
  watch: { 
    chat: async function(new_chat) { 
      this.newChat(new_chat.id);
    }
  },
  data() {
    return {
      messages: [],
      more_messages: true,
      last_timestamp: null,
      new_message: '',
      selectedFile: null,
      loading : false,
      showNotesModal: false,
      notes : [],
      newNote : "",
      fileInputClass: "fa-solid fa-paperclip icon-file"
    };
  },

  created() {
    this.newChat(this.chat.id);
  },
  
  methods: {
    async newChat(chat_id) {
      try {

        this.loading = true;
        
        let response = await chatMessages(chat_id);
        
        this.messages = response.messages.reverse();
        
        this.more_messages = response.more_messages;
        this.last_timestamp = response.last_timestamp;
        this.new_message = '';
        
        
      } catch(error) {
        alert(error)
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    handleEnter(event) {
      if (!event.shiftKey) {
        // Si se presiona solo Enter, enviar el mensaje
        this.sendMessage();
      }
    },

    handleLabelClick(event) {
      if (this.selectedFile) {
        event.preventDefault(); // Evita que el input file se dispare
        this.clearFile(); // Limpia el archivo seleccionado
      }
    },

    async sendMessage() {
      if (this.new_message.trim() !== '' || this.selectedFile) {
        try {
          const formData = new FormData();
          formData.append('chat_id', this.chat.id); 

          if (this.selectedFile) {
            formData.append('media', this.selectedFile);

            // Determine the type based on the file type
            let fileType = this.selectedFile.type.split('/')[0];
            if(fileType == 'application') fileType = 'document';
            formData.append('type', fileType); // This can be 'image', 'video', 'application' (for documents), etc.
          } else {
            formData.append('type', 'text');
          }

          formData.append('message', this.new_message);

          this.new_message = '';
          this.selectedFile = null;

          let response = await sendMessage(formData);
          
          this.messages.push(response.message);
          this.$emit('sended_message', response.message);

          this.$nextTick(() => {
            this.scrollToBottom();
          });
          
        } catch (error) {
          console.error(error);
        }
      }
    },

    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    clearFile() {
      this.selectedFile = null;
      this.fileInputClass = "fa-solid fa-paperclip icon-file"
      // this.$refs.fileInput.value = '';
    },

    hoverFileInput() {
      if(this.selectedFile) this.fileInputClass = 'fa-solid fa-trash icon-file'
    },

    async receiveMessage(message_id) {
      let message = await getMessage(message_id);

      let toScroll = this.isBottomScrolled();
      this.messages.push(message);

      if (toScroll) { 
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    async loadMessages() {
      try{
        this.loading = true;
        let response = await chatMessages(this.chat.id, this.last_timestamp);
        this.messages = response.messages.reverse().concat(this.messages);
        this.more_messages = response.more_messages;
        this.last_timestamp = response.last_timestamp;
        this.new_message = '';
      } catch(error) {
        alert(error)
      } finally {
        this.loading = false;
      }
     
    },

    isBottomScrolled() {
      let messagesList = document.getElementById('messages-list');
      return messagesList.scrollTop == messagesList.scrollHeight - messagesList.clientHeight;
    },

    scrollToBottom() {
      let messagesList = document.getElementById('messages-list');
      messagesList.scrollTop = messagesList.scrollHeight;
    },

    async handleScroll() {
      const messagesList = document.getElementById('messages-list');
      if (messagesList.scrollTop === 0 && this.more_messages && !this.loading) {
        const currentScrollHeight = messagesList.scrollHeight;
        const currentScrollTop = messagesList.scrollTop;
        
        await this.loadMessages();     
        
        this.$nextTick(() => {
          const newScrollHeight = messagesList.scrollHeight;
          messagesList.scrollTop = newScrollHeight - currentScrollHeight + currentScrollTop;
        });
      }
    },
    getPreviousMessageUserId(index) {
      if (index > 0) {
        return this.messages[index - 1].user_id;
      }
      return null;
    },

    async notesModal() {
      this.showNotesModal = true;

      this.notes = await getChatNotes(this.chat.id)
    },

    async deleteNote(note_id) {
      await deleteNote(note_id);
      this.notes = this.notes.filter(note => note.id !== note_id);
    },

    async createNote() {
      if(this.newNote == '') return;
      const form = {
        chat_id: this.chat.id,
        note: this.newNote
      };

      let note = await createNote(form);
      this.notes.unshift(note);
      this.newNote = '';
    },

    newMessageStatus(message_id, status) {
      const index = this.messages.findIndex(message => message.id == message_id);
      if(index != -1 && this.messages[index].status < status) {
        this.messages[index].status = status;
      }
    },

    updateChatStatus(status) {
      this.$emit('update-chat-status', status);
    }

  }
};
</script>

<style scoped>
.chat-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1E1E1E;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden; /* Evita el desbordamiento */
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 10px;
  border-bottom: 1px solid #3B3B3B;
  margin-bottom: 10px; /* Añade espacio entre la barra y los mensajes */
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
}

.message-input textarea {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  color: #ddd;
  resize: none;
}

.message-input button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3b3b3b;
  color: #ddd;
  cursor: pointer;
}

.message-input button:hover {
  background-color: #4b4b4b;
}

.file-input-label {
  display: inline-block;
  cursor: pointer;
  width: 70px;
  /*margin-right: 10px;*/
  height: 100%;
  background-color: #525252;
  border-radius: 7px;
  color: #ddd;
}

.file-input-label input[type="file"] {
  display: none;
}

.file-input-label i {
  font-size: 1.2rem;
}

.icon-file {
  margin-top: 20%;
}

.loader {
  display: inline-block;
  width: 45px;
  aspect-ratio: 1;
  --c: no-repeat linear-gradient(#dafc5f 0 0);
  background: 
    var(--c) 0%   50%,
    var(--c) 50%  50%,
    var(--c) 100% 50%;
  background-size: 20% 100%;
  animation: l1 1s infinite linear;
}
@keyframes l1 {
  0%  {background-size: 20% 100%,20% 100%,20% 100%}
  33% {background-size: 20% 10% ,20% 100%,20% 100%}
  50% {background-size: 20% 100%,20% 10% ,20% 100%}
  66% {background-size: 20% 100%,20% 100%,20% 10% }
  100%{background-size: 20% 100%,20% 100%,20% 100%}
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Ajustado para coincidir con el esquema de colores */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #2E2E2E; /* Fondo del modal ajustado al esquema de colores */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* Ajuste del color de la sombra */
  text-align: center;
  color: #DDD; /* Color del texto del modal */
  width: 60%;
  max-width: 60%;
}

.note-input-container {
  display: flex;
  margin-bottom: 10px;
}

.note-input {
  flex: 25;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  background-color: #3B3B3B;
  color: #DDD;
}

.add-note-button {
  flex:1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.notes-list {
  max-height: 70vh; /* Ajuste de la altura máxima de la lista */
  overflow-y: auto;
}

.note {
  background-color: #3B3B3B;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-content {
  flex: 1;
  margin-right: 10px;
}

.note-header {
  font-weight: bold;
  margin-bottom: 5px;
  color: #FFC107;
}

.note-body {
  margin-top: 20px;
  color: #DDD;
  white-space: pre-line;
}

.note-delete {
  color: white;
  background-color: red;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.icon-file-selected {
  background-color: #FFC107;
  color: black;
}

.icon-file-selected:hover {
  content: '\f00d';
  background-color: red;
}

.send-button {
  margin-left: 20px;
  height: 100%;
}

</style>
