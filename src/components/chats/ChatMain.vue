<template>
  <div class="chat-main">
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
      <input 
        type="text" 
        v-model="new_message" 
        @keyup.enter="sendMessage"
        placeholder="Escribe un mensaje..."
      />
      <label class="file-input-label">
        <i class="fa-solid fa-paperclip"></i>
        <input 
          type="file" 
          ref="fileInput"
          @change="handleFileChange"
        />
      </label>
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
import { chat_messages, send_message } from '@/routes/chats';
import { get_message } from '@/routes/messages';
import Message from './Message.vue';

export default {
  name: "ChatMain",
  components: {
    Message,
  },
  props: ['chat'],
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
    };
  },

  created() {
    this.newChat(this.chat.id);
  },
  
  methods: {
    async newChat(chat_id) {
      try {

        this.loading = true;
        
        let response = await chat_messages(chat_id);
        
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
          this.$refs.fileInput.value = '';

          let response = await send_message(formData);
          
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

    async receiveMessage(message_id) {
      let message = await get_message(message_id);

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
        let response = await chat_messages(this.chat.id, this.last_timestamp);
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
      if (messagesList.scrollTop === 0 && this.more_messages) {
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

.message-input input[type="text"] {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  color: #ddd;
  margin-right: 10px;
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
  margin-right: 10px;
  color: #ddd;
}

.file-input-label input[type="file"] {
  display: none;
}

.file-input-label i {
  font-size: 1.2rem;
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

</style>
