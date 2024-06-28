<!-- src/components/Login.vue -->
<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="button"  @click="handleLogin">Login</button>
      </form>
    </div>
  </template>
  
  <script>

  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: false
      };
    },
    methods: {
      ...mapActions(['login']),
      async handleLogin() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        await this.login(credentials);
        this.$router.push({name: 'landing'});
      } catch (error) {
        this.error = error;
      }
    }
  }
  };
  </script>
  
  <style scoped>

  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .form-group {
    margin-bottom: 1em;
  }
  form label {
    display: block;
    margin-bottom: 0.5em;
  }
  form input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  
</style>
  