<template>
  <div>
    <button class="upper-button" @click="chat">Chat</button>
    <div class="buttons-container">
      <button @click="users">Usuarios</button>
      <button @click="organizations">Organizaciones</button>
      <button @click="register">Crear Usuario</button>
      <button @click="create_org">Crear Organización</button>
      <button @click="edit_prof">Editar Perfil</button>
      <button @click="edit_org">Editar organización</button>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    methods: {
      chat() {
        this.$router.push({ name: 'Chat' });
      },
      register() {
        this.$router.push({ name: 'Register' });
      },
      users() {
        this.$router.push({ name: 'Users' });
      },
      edit_org() {
        this.$router.push({ name: 'EditOrganization' });
      },
      organizations() {
        this.$router.push({ name: 'Organizations' });
      },
      create_org() {
        this.$router.push({ name: 'CreateOrganization' });
      },
      edit_prof() {
        this.$router.push({ name: 'EditUser'});
      }
    }
  };
  </script>
  
  <style scoped>

  .upper-button {
    width: 800px !important;
    max-width: 820px !important;
    margin-bottom: 20px;
  }

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
  