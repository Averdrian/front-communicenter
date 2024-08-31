<template>
  <div class="list-container">  
    <ViewTitle title="Usuarios"/>
    <div class="user-list">
      <div class="title-container">
        <div class="filter-container">
          <label for="organization-select" class="filter-label">Organización</label>
          <select id="organization-select" v-model="selected_organization" class="user-select">
            <option v-for="organization in organizations" :key="organization.id" :value="organization.id">{{ organization.name }}</option>
          </select>
          <button @click="searchOrg" class="search-btn">Buscar</button>
        </div>
        <h1 class="title">Listado de Usuarios</h1>
      </div>
      <div class="user-items">
        <UserItem @delete-user="modalDelete(user)" v-for="user in users" :key="user.id" :user="user" />
      </div>
      <div class="pagination">
        <button @click="changePage(page - 1)" :disabled="page == 1">{{'<'}}</button>
        <button disabled>{{ page }}</button>
        <button @click="changePage(page + 1)" :disabled="page >= totalPages">{{'>'}}</button>
      </div>
    </div>
    

    <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal">
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar al usuario <strong>{{ userToDelete.username }}</strong>? Se borrarán también todos sus mensajes</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="confirm-btn">Confirmar</button>
          <button @click="cancelDelete" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>




<script>

import ViewTitle from '@/components/ViewTitle.vue';
import UserItem from '../components/users/UserItem.vue';
import { users, deleteUser } from '@/routes/users';
import {getAllOrganizations} from '@/routes/organizations';

export default {
  name: "UserList",
  components: {
    UserItem,
    ViewTitle
  
  },

  data() {
    return {
      users: [],
      page: 1,
      showDeleteModal: false,
      userToDelete: null,
      totalPages: 0,
      selected_organization: null,
      organizations: []
    };
  },

  async created() {
    let users_data = await users();
    this.users = users_data.users;
    this.totalPages = users_data.pages;
    this.organizations = await getAllOrganizations();
  },

  methods : {
    modalDelete(user) {
      this.userToDelete = user;
      this.showDeleteModal = true;
    },
    async confirmDelete() {

      try {
        await deleteUser(this.userToDelete.id)
        this.users = this.users.filter(user => user.id !== this.userToDelete.id);
      } catch(error) {
        alert(error)
      }
      finally {
        this.showDeleteModal = false;
        this.userToDelete = null;
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.userToDelete = null;
    },
    async changePage(page) {
      this.page = page;
      let users_data = await users(page)
      this.users = users_data.users;
    },
    async searchOrg() {
      this.page = 1;
      let data = await users(1, this.selected_organization);
      this.users = data.users;
      this.totalPages = data.pages;
    }
  }

};
</script>
<style scoped>

.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
}

.user-list {
  width: 100%;
  padding: 20px;
  background-color: #1E1E1E;
  color: #fff;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.title {
  font-size: 24px;
  color: #FFC107;
  text-align: left;
  flex-grow: 1;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.filter-label {
  margin-right: 10px;
  font-size: 16px;
  color: #ddd;
}

.user-select {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #2E2E2E;
  color: #fff;
  border: 1px solid #FFC107;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.search-btn {
  padding: 6px 12px;
  font-size: 16px;
  background-color: #FFC107;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Ajustado para coincidir con el esquema de colores */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #2E2E2E; /* Fondo del modal ajustado al esquema de colores */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* Ajuste del color de la sombra */
  text-align: center;
  color: #DDD; /* Color del texto del modal */
  width: 400px;
  max-width: 90%;
}

.modal h2 {
  margin-bottom: 20px;
  color: #FFC107;
}

.modal p {
  margin-bottom: 20px;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
}

.confirm-btn, .cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-btn {
  background-color: #d9534f;
  color: black;
}

.confirm-btn:hover {
  background-color: #c9302c;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #FFC107;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

</style>
