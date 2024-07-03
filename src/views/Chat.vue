<template>
  <ViewTitle title="Chats"/>
    <div class="chat-container">
      <div class="sidebar">
        <ChatCardList :chat_list="chat_list"/>
      </div>
      <div class="main-chat">
        <!-- Contenido de la columna 2/3 -->
      </div>
    </div>
  </template>
  
  <script>

import ViewTitle from '@/components/ViewTitle.vue';
import ChatCardList from '@/components/chats/ChatCardList.vue';
import {chats} from '@/routes/chats';

  export default {
    name: 'chat',
    components : {
      ViewTitle,
      ChatCardList
    },

    data() {
      return {
        chat_list : []
      }
    },

    async created() {
      this.chat_list = await chats();
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
  flex: 2;
  background-color: #2f2e2e; /* Color de fondo aún más oscuro */
  padding: 10px;
  box-sizing: border-box;
  color: #ddd; /* Color del texto más claro */
} 
</style>