<template>
  <div class="list-container">  
    <ViewTitle title="Organizaciones"/>
    <div class="organization-list">
      <div class="title-container">
        <h1 class="title">Listado de Organizaciones</h1>
      </div>
      <div class="organization-items">
        <OrganizationItem v-for="organization in organizations" :key="organization.id" :organization="organization" />
      </div>
      <div class="pagination">
        <button @click="changePage(page - 1)" :disabled="page == 1">{{'<'}}</button>
        <button disabled>{{ page }}</button>
        <button @click="changePage(page + 1)" :disabled="page >= totalPages">{{'>'}}</button>
      </div>
    </div>
  </div>
</template>




<script>

import ViewTitle from '@/components/ViewTitle.vue';
import OrganizationItem from '../components/organizations/OrganizationItem.vue';
import { getOrganizations } from '@/routes/organizations';

export default {
  name: "Organizations",
  components: {
    OrganizationItem,
    ViewTitle
  
  },

  data() {
    return {
      organizations: [],
      page: 1,
      showDeleteModal: false,
      totalPages: 0,
    };
  },

  async created() {
    let organizations_data = await getOrganizations();
    this.organizations = organizations_data.organizations;
    this.totalPages = organizations_data.pages;
  },

  methods : {
    async changePage(page) {
      this.page = page;
      let organization_data = await getOrganizations(page)
      this.organizations = organization_data.organizations;
    },
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

.organization-list {
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

.organization-select {
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

.organization-items {
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
