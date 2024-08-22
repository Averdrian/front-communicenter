<template>
    <ViewTitle title="Register Organization"/>
    <div class="register-container">
      <div class="register">
        <h2>Crear Organización</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="name" required/>
          </div>
          <div class="form-group">
            <label for="whatsapp_phone_id">WhatsApp Phone ID (opcional):</label>
            <input type="number" id="whatsapp_phone_id" v-model="whatsapp_phone_id" required/>
          </div>
          <!-- <div class="form-group">
            <label for="whatsapp_business_account_id">WhatsApp Business Account ID (opcional):</label>
            <input type="number" id="whatsapp_business_account_id" v-model="whatsapp_business_account_id" required/>
          </div> -->
          <div class="form-group">
            <label for="whatsapp_api_key">WhatsApp API Key (opcional):</label>
            <input type="text" id="whatsapp_api_key" v-model="whatsapp_api_key"/>
          </div>
          <div class="form-group">
            <label for="whatsapp_verify_token">WhatsApp API Verify Token (opcional):</label>
            <input type="text" id="whatsapp_api_key" v-model="whatsapp_verify_token"/>
          </div>
          <div class="form-group register-button">
            <button id="register-button" type="button" @click="handleRegister">Crear Organización</button>
          </div>
          <p v-if="error" class="error-message">Error al crear la organización, inténtelo de nuevo más tarde</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import ViewTitle from '@/components/ViewTitle.vue';
  import { createOrganization } from '@/routes/organizations';
  
  export default {
    data() {
      return {
        name: '',
        whatsapp_phone_id: null,
        whatsapp_business_account_id: null,
        whatsapp_api_key: '',
        whatsapp_verify_token: '',
        error: false,
      };
    },
    components: { ViewTitle },
    methods: {
      async handleRegister() {
        try {
          if (this.name === '') {
            this.error = true;
            return;
          }
          const organizationData = {
            name: this.name
          };
          if(this.whatsapp_phone_id != null) organizationData['wa_phone_id'] = this.whatsapp_phone_id;
          if(this.whatsapp_business_account_id != null)  organizationData['wb_account_id'] = this.whatsapp_business_account_id;
          if(this.whatsapp_api_key != null)  organizationData['wa_api_key'] = this.whatsapp_api_key;
          if(this.whatsapp_verify_token != null) organizationData['wa_verify_token'] = this.whatsapp_verify_token;
          let response = await createOrganization(organizationData);
          if (response === true) this.$router.push({ name: 'Organizations' });
        } catch (error) {
          this.error = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #2c2c2c;
    width: 100%;
  }
  
  .register {
    max-width: 80%;
    min-width: 50%;
    padding: 2em 3em;
    border: 1px solid #444;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    background-color: #1e1e1e;
    color: #fff;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 2em;
    color: #fff;
    font-size: 2em;
  }
  
  .form-group {
    max-width: 100%;
    margin-bottom: 1.5em;
  }
  
  form label {
    display: block;
    margin-bottom: 0.5em;
    color: #bbb;
    font-size: 1.1em;
  }
  
  form input, form select {
    width: 100%;
    padding: 1em;
    border: 1px solid #555;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
    font-size: 1em;
    background-color: #333;
    color: #fff;
  }
  
  form input:focus, form select:focus {
    border-color: #CCD700;
    outline: none;
  }
  
  button {
    width: 100%;
  }
  
  .error-message {
    margin-top: 1em;
    color: #FF4C4C;
    text-align: center;
    font-size: 1.1em;
  }
  
  .register-button {
    margin-top: 50px;
  }

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
  </style>
  