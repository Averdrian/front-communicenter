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
        socket : null,
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
      this.socket = io(process.env.VUE_APP_API_BASE_URL);

      this.socket.on('receive-message-'+this.user.organization_id, (message) => {
        if(this.selected_chat?.id === message.chat_id) {
          this.$refs.chat_main.receiveMessage(message.id);
        }  
        
      this.receiveMessage(message.chat_id, message.new_chat_status, message.new_chat_status_name, message.new_expires_at);


    });
   
  },  
  beforeUnmount() {
    if(this.socket)
      this.socket.close();
      clearInterval(this.interval_id);
    },
    methods : {
      selectedChat(chat) {
        this.selected_chat = chat;
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
  height: calc(100vh - 10vh); /* Resta el tamaño del header */
}

.sidebar {
  flex: 2;
  background-color: #1e1e1e; /* Color de fondo más oscuro */
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; /* Habilita el scroll vertical */
}

.main-chat {
  flex: 7;
  background-color: #2f2e2e; /* Color de fondo aún más oscuro */
  padding: 10px;
  box-sizing: border-box;
  color: #ddd; /* Color del texto más claro */
} 
</style>