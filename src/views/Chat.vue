<template>
  <ViewTitle title="Chats"/>
    <div class="chat-container">
      <div class="sidebar">
        <ChatCardList @selected="selectedChat" :chat_list="chat_list"/>
      </div>
      <div class="main-chat">
        <ChatMain :chat="selected_chat"/>
      </div>
    </div>
  </template>
  
  <script>

import ViewTitle from '@/components/ViewTitle.vue';
import ChatCardList from '@/components/chats/ChatCardList.vue';
import ChatMain from '@/components/chats/ChatMain.vue'
import {chats} from '@/routes/chats';


  export default {
    name: 'chat',
    components : {
      ViewTitle,
      ChatCardList,
      ChatMain
    },

    data() {
      return {
        chat_list : [],
        selected_chat : null
      }
    },

    async created() {
      this.chat_list = await chats();
    },
    methods : {
      selectedChat(chat) {
        this.selected_chat = chat;
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