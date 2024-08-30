<template>
  <div>
  
    <button class="upper-button" @click="chat">Chat</button>
    <button class="upper-button" @click="edit_prof">Editar Perfil</button>

  </div>
  </template>
  
  <script>
  export default {
    methods: {
      chat() {
        this.$router.push({ name: 'Chat' });
      },
      edit_prof() {
        this.$router.push({ name: 'EditUser'});
      }
    }
  };
  </script>
  
  <style scoped>

  .upper-button {
    width: 500px !important;
    max-width: 820px !important;
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
  }
  
  button {
    padding: 15px 30px;
    border-radius: 5px;
  }
 
  </style>
  