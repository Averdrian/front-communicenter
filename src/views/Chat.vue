<template>
  <ViewTitle title="Chats"/>
  <div class="chat-container">
    <div class="sidebar">
      <ChatCardList @selected="selectedChat" :chat_list="chat_list" ref="chat_card_list"/>
    </div>
    <div class="main-chat">
      <ChatMain v-if="selected_chat" :chat="selected_chat" @sended_message="sendedMessage" ref="chat_main"/>  
    </div>
  </div>
</template>

<script>
import ViewTitle from '@/components/ViewTitle.vue';
import ChatCardList from '@/components/chats/ChatCardList.vue';
import ChatMain from '@/components/chats/ChatMain.vue'
import {chats} from '@/routes/chats';
import io from 'socket.io-client';
import { mapGetters } from 'vuex';

export default {
  name: 'chat',
  components : {
    ViewTitle,
    ChatCardList,
    ChatMain
  },
  computed : {
    ...mapGetters(['user'])
  },
  data() {
    return {
      chat_list : [],
      selected_chat : null,
      socket_messages : null,
      socket_status : null,
      interval_id : null
    }
  },
  async created() {
    this.chat_list = await chats();
    this.chat_list.forEach(chat => {
      this.updateTimeLeft(chat);
    });
    this.interval_id = setInterval(this.updateTimers, 1000);
  },
  async mounted() {
    this.socket_messages = io(process.env.VUE_APP_API_BASE_URL);
    this.socket_status = io(process.env.VUE_APP_API_BASE_URL);

    this.socket_messages.on('receive-message-'+this.user.organization_id, (message) => {
      if(this.selected_chat?.id === message.chat_id) {
        this.$refs.chat_main.receiveMessage(message.id);
      }  
      
      this.receiveMessage(message.chat_id, message.new_chat_status, message.new_chat_status_name, message.new_expires_at);
    });
  },  
  beforeUnmount() {
    if(this.socket_messages)
      this.socket_messages.close();
    if(this.socket_status)
      this.socket_status.close();
      clearInterval(this.interval_id);
    },
  methods : {
    selectedChat(chat) {
      if(this.selected_chat) {
        this.socket_status.close();
      }

      this.selected_chat = chat;
      this.socket_messages.on('receive-status-'+this.selected_chat.id, (message_data) => {
        this.$refs.chat_main.newMessageStatus(message_data.message_id, message_data.status);
      });
    },

    sendedMessage(message) {
      this.receiveMessage(message.chat_id, message.new_chat_status,message.new_chat_status_name, 0);
    },

    receiveMessage(chat_id, new_status, new_status_name, new_expires_at) {
        const index = this.chat_list.findIndex(chat => chat.id === chat_id);
        if(index == -1) {
          console.log(new_status)
          //TODO: coger el chat cuando no esta en la lista
          //TODO: Cambiar la paginacion de los chats, paginar no por paginas sino por last_message_at
        }
        else {
          const [chat] = this.chat_list.splice(index, 1);
          chat.status = new_status;
          chat.status_name = new_status_name;

          if(new_expires_at){
            chat.expires_at = new_expires_at;
            this.updateTimeLeft(chat);
          }

          this.chat_list.unshift(chat);
        }
    },

    updateTimeLeft(chat) {
      const expiresAt = new Date(chat.expires_at).getTime();
      const now = new Date().getTime();
      chat.time_left = Math.max(0, Math.floor((expiresAt - now) / 1000));
    },

    updateTimers() {
      this.chat_list.forEach(chat => {
        if(chat.time_left > 0)
          --chat.time_left;
      });
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10vh); /* Resta el tamaño del header */
  overflow: hidden; /* Evita el desbordamiento */
}

.sidebar {
  flex: 0 0 250px;
  background-color: #1e1e1e; /* Color de fondo más oscuro */
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; /* Habilita el scroll vertical */
}

.main-chat {
  flex: 1;
  background-color: #2f2e2e; /* Color de fondo aún más oscuro */
  padding: 10px;
  box-sizing: border-box;
  color: #ddd; /* Color del texto más claro */
  overflow: hidden; /* Evita el desbordamiento horizontal */
}

@media (min-width: 750px) {
  .chat-container {
    flex-direction: row;
  }
}
</style>
