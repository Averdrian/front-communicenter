<template>
  <ViewTitle title="Chats"/>
    <div class="chat-container">
      <div class="sidebar">
        <ChatCardList @selected="selectedChat" :chat_list="chat_list" ref="chat_card_list"/>
      </div>
      <div class="main-chat">
        <ChatMain v-if="selected_chat" :chat="selected_chat" @sended_message="sended_message" ref="chat_main"/>
        
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
        socket : null
      }
    },

    async created() {
      this.chat_list = await chats();
    },
    async mounted() {
    this.socket = io(process.env.VUE_APP_API_BASE_URL);

    this.socket.on('receive-message-'+this.user.organization_id, (message) => {
      if(this.selected_chat?.id === message.chat_id) {
        this.$refs.chat_main.receiveMessage(message.id);
      }
      
      this.receiveMessage(message.chat_id, message.new_chat_status, message.new_chat_status_name);


    });
   
  },  
  beforeUnmount() {
    if(this.socket)
      this.socket.close();
  },
    methods : {
      selectedChat(chat) {
        this.selected_chat = chat;
      },

      sended_message(message) {
        this.receiveMessage(message.chat_id, message.new_chat_status,message.new_chat_status_name);
      },
      receiveMessage(chat_id, new_status, new_status_name) {

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
            this.chat_list.unshift(chat);
          }


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
  flex: 1;
  background-color: #1e1e1e; /* Color de fondo más oscuro */
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; /* Habilita el scroll vertical */
}

.main-chat {
  flex: 4;
  background-color: #2f2e2e; /* Color de fondo aún más oscuro */
  padding: 10px;
  box-sizing: border-box;
  color: #ddd; /* Color del texto más claro */
} 
</style>