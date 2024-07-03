<template>
  <ViewTitle title="Login"/>
  <div class="login-container">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required/>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <div class="password-container">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required />
            <button type="button" id="toggle-password" class="toggle-password" @click="togglePasswordVisibility">
              <i v-if="showPassword" class="fa-regular fa-eye" style="color: #FFD700"></i>
              <i v-else class="fa-regular fa-eye-slash" style="color: #FFD700"></i>
            </button>
          </div>
        </div>
        <div class="form-group loggin-button">
          <button id="loggin-button" type="button" @click="handleLogin">Login</button>
        </div>
        <p v-if="error" class="error-message">Email o contraseña incorrectos. Inténtalo de nuevo.</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ViewTitle from '@/components/ViewTitle.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      error: false
    };
  },
  components : { ViewTitle },
  mounted() {
    let tgpass = document.getElementById("toggle-password");
    tgpass.style.height = document.getElementById("password").offsetHeight + "px";

    this.fixEmailHeight();
    window.addEventListener("resize", this.fixEmailHeight);
  },
  unmounted() {
    window.removeEventListener("resize", this.fixEmailHeight);
  },
  methods: {
    ...mapActions(['login']),
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        await this.login(credentials);
        this.$router.push({ name: 'chat' });
      } catch (error) {
        this.error = true;
      }
    },

    fixEmailHeight() {
      let email = document.getElementById("email");
      email.style.width = document.getElementById("loggin-button").offsetWidth + "px";
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #2c2c2c;
  width: 100%;
}

.login {
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
  width: 100%;
  margin-bottom: 1.5em;
}

form label {
  display: block;
  margin-bottom: 0.5em;
  color: #bbb;
  font-size: 1.1em;
}

.password-container {
  display: flex;
  align-items: center;
}

form input {
  width: calc(100% - 90px);
  padding: 1em;
  border: 1px solid #555;
  border-radius: 5px 0 0 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  font-size: 1em;
  background-color: #333;
  color: #fff;
}

.toggle-password {
  width: 10%;
  padding: 1em;
  border: 1px solid #555;
  border-left: none;
  border-radius: 0 5px 5px 0;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-password:hover {
  background-color: #555;
}

form input:focus {
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

.loggin-button {
  margin-top: 50px;
}
</style>
