<template>
    <div class="chat-list">
      <ChatCard v-for="n in chat_list" :chat="n" :key="n" />
    </div>
  </template>
  
  <script>
  import ChatCard from './ChatCard.vue';
  
  export default {
    name: 'ChatCardList',
    components: {
      ChatCard,
    },
    props: ['chat_list']
  };
  </script>
  
  <style scoped>
  .chat-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    padding-right: 10px;
  }
  </style>
  