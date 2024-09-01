<template>
    <div class="organization-item">
      <div class="organization-info">
        <div class="organization-details">
          <p class="data-title">Nombre</p>
          <p class="data-data">{{ organization.name }}</p>
        </div>
        <div class="organization-details">
          <p class="data-title">Whatsapp Phone ID</p>
          <p class="data-data">{{ organization.wa_phone_id }}</p>
        </div>
        <div class="organization-details">
          <p class="data-title">Verify Token</p>
          <p class="data-data">{{ organization.wa_verify_token }}</p>
        </div>
        <div class="organization-actions">
          <button @click="editOrganization"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OrganizationItem",
    props: {
      organization: {
        type: Object,       
        required: true
      }
    },
    methods: {
      editOrganization() {
        this.$router.push({name: 'EditOrganization', params: {'organization_id': this.organization.id}})
      },
    }
  };
  </script>
  
  <style scoped>
  .organization-item {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #2E2E2E;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .organization-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .organization-details {
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
  
  .organization-actions {
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
  