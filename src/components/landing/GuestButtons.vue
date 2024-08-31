<template>
    <div class="buttons-container">
      <button @click="login">Iniciar Sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login() {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  
  <style scoped>
  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; 
  }
  
  button {
    flex: 1 1 45%;
    max-width: 400px;
    padding: 15px 30px;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
  }
  </style>