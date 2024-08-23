<template>
    <div class="user-item">
      <div class="user-info">
        <div class="user-details">
          <p class="user-name">{{ user.username }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
        <div class="user-actions">
          <button @click="editUser"><i class="fa-solid fa-pen-to-square"></i></button>
          <button @click="deleteUser">Eliminar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserItem",
    props: {
      user: {
        type: Object,       
        required: true
      }
    },
    methods: {
      editUser() {
        this.$router.push({name: 'EditUser', params: {'user_id': this.user.id}})
      },
      deleteUser() {
        // Lógica para eliminar el usuario
        alert(`Eliminar a ${this.user.name}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .user-item {
    margin-top: 10px;
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #2E2E2E;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    color: #FFC107;
    text-align: left;
  }
  
  .user-email {
    font-size: 14px;
    color: #ddd;
    margin: 5px 0 0;
    text-align: left
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
  }
  
  button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:focus {
    outline: none;
  }
  </style>
  