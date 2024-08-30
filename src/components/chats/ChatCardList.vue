<template>
    <div class="chat-list" id="chat-list" @scroll="handleScroll">
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

    data() {
      return {
        loading: false
      };
    },

    methods : {
        select_chat(chat) {
            this.$emit('selected', chat);
        },
        handleScroll() {
          const chatslist = document.getElementById('chat-list');
          if(chatslist.scrollHeight - chatslist.clientHeight - chatslist.scrollTop  < 30 && !this.loading) {
            this.loading = true;
            this.$emit('load-chats')
          }
        },
        unlockLoad() {
          console.log('unload')
          this.loading = false;
        }

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
  