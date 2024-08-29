<template>
    <div class="chat-list">
      <ChatCard @click="select_chat(n)" v-for="n in chat_list" :chat="n" :selected="n.id == selected_chat?.id" :key="n" />
    </div>
  </template>
  
  <script>
import ChatCard from './ChatCard.vue';
  
  export default {
    name: 'ChatCardList',
    components: {
      ChatCard,
    },
    props: ['chat_list', 'selected_chat'],

    methods : {
        select_chat(chat) {
            this.$emit('selected', chat);
        },

    }
  
};
  </script>
  
  <style scoped>
  .chat-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    padding-right: 5px;
    padding-left: 5px;
    overflow-x: hidden;
  }
  </style>
  