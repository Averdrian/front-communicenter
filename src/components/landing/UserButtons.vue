<template>
    <div class="buttons-container">
      <button @click="login">Chat</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login() {
        this.$router.push({ name: 'Chat' });
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons-container {
    display: flex;
    justify-content: center;
  }
  
  button {
    padding: 15px 30px;
    border-radius: 5px;
  }
 
  </style>
  