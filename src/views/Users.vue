<template>
    <div class="user-list">
      <h1 class="title">Listado de Usuarios</h1>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserList",
    data() {
      return {
        users: [
          { id: 1, name: "Juan Perez", email: "juan.perez@example.com" },
          { id: 2, name: "Maria Lopez", email: "maria.lopez@example.com" },
          { id: 3, name: "Carlos Sanchez", email: "carlos.sanchez@example.com" }
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .user-list {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #1E1E1E;
    color: #fff;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #FFC107;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th, .user-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    color: #ddd;
  }
  
  .user-table th {
    background-color: #2E2E2E;
    color: #FFC107;
  }
  
  .user-table tr:nth-child(even) {
    background-color: #333;
  }
  
  .user-table tr:nth-child(odd) {
    background-color: #2A2A2A;
  }
  </style>
  