<template>
  <div class="user-item">
    <div class="user-info">
      <div class="user-details">
        <p class="data-title">Nombre</p>
        <p class="data-data">{{ user.username }}</p>
      </div>
      <div class="user-details">
        <p class="data-title">Email</p>
        <p class="data-data">{{ user.email }}</p>
      </div>
      <div class="user-details">
        <p class="data-title">Organización</p>
        <p class="data-data">{{ user.organization }}</p>
      </div>
      <div class="user-actions">
        <button @click="editUser"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="button-delete" @click="deleteUser">Eliminar</button>
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
      this.$emit('delete-user')
    }
  }
};
</script>

<style scoped>
.user-item {
  margin-top: 10px;
  display: flex;
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
  width: 30%; /* Ajusta según el espacio necesario */
}

.data-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: #FFC107;
  text-align: left;
}

.data-data {
  font-size: 17px;
  color: #ddd;
  margin: 5px 0 0;
  text-align: left;
}

.user-actions {
  display: flex;
  gap: 10px;
  align-items: center;
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

button i {
  margin-right: 5px;
}

.button-delete:hover {
  background-color: red;
}

</style>
