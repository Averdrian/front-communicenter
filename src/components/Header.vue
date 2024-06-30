<template>
    <div class="header">
      <div class="logo-container">
        <img class="logo" src="logo.png" alt="Logo">
      </div>
      <div class="menu">
        <button @click="goToProfile">Perfil</button>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToProfile() {
        this.$router.push({ name: 'profile' });
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #c4c734; /* Cambia este color según tu preferencia */
  }
  
  .logo-container {
    height: 100%;
  }
  
  .logo {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
  
  .menu {
    display: flex;
    gap: 10px;
  }
  
  button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  