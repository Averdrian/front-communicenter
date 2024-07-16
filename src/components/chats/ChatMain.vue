<template>
  <div class="chat-main">
    <div class="messages-list" id="messages-list" @scroll="handleScroll">
      <Message 
        v-for="message in messages" 
        :key="message.id" 
        :message="message"
      />
    </div>
    <div class="message-input">
      <input 
        type="text" 
        v-model="new_message" 
        @keyup.enter="sendMessage"
        placeholder="Escribe un mensaje..."
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
import {chat_messages, send_message} from '@/routes/chats';
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
      more_messages : true,
      last_timestamp : null,
      new_message: '',
    };
  },

  created() {
    this.newChat(this.chat.id);
  },
  
  methods: {


    async newChat(chat_id) {
      let response = await chat_messages(chat_id);
      this.messages = response.messages.reverse();
      this.more_messages = response.more_messages;
      this.last_timestamp = response.last_timestamp;
      this.new_message = '';

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    async sendMessage() {
      if (this.new_message.trim() !== '') {
        try {
          const message_data = {
            chat_id:this.chat.id,
            type:'text',
            message:this.new_message,
          }
          this.new_message = '';
          let response = await send_message(message_data);
          
          this.messages.push(response.message);

          this.$emit('sended_message', response.message);

          this.$nextTick(() => {
            this.scrollToBottom();
          });
          
        } catch(error) {
          console.error(error);
        }
      }
    },

    receiveMessage(message) {
      let toScroll = this.isBottomScrolled();
      this.messages.push(message);

      if(toScroll) { 
        this.$nextTick(() => {
            this.scrollToBottom();
          });
      }
      
    },

    async loadMessages() {

      let response = await chat_messages(this.chat.id, this.last_timestamp);
      this.messages = response.messages.reverse().concat(this.messages);
      this.more_messages = response.more_messages;
      this.last_timestamp = response.last_timestamp;
      this.new_message = '';
      
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
        const messagesList = document.getElementById('messages-list');
        const currentScrollHeight = messagesList.scrollHeight;
        const currentScrollTop = messagesList.scrollTop;
        
        await this.loadMessages();     
        
        this.$nextTick(() => {
        const newScrollHeight = messagesList.scrollHeight;
        messagesList.scrollTop = newScrollHeight - currentScrollHeight + currentScrollTop;
      });
        // Aquí puedes hacer la llamada para cargar más mensajes
      }
    }
  }
};
</script>

<style scoped>
.chat-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #121212;
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

.message-input input {
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
</style>
