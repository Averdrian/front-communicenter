<!-- src/components/Header.vue -->
<template>
  <div class="header">
    <div class="logo-container">
      <img class="logo" src="/logo.png" alt="Logo" @click="goToLanding">
      <!-- <img class="logo" src="logo.png" alt="Logo" /> -->
    </div>
    <div class="menu">
      <button v-if="isAuthenticated" @click="handleLogout">Cerrar Sesión</button>
      <button v-else @click="goToLogin">Iniciar Sesión</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    goToLanding() {
      this.$router.push({ name: 'Landing' });
    },
    goToChat() {
      this.$router.push({ name: 'Chat' });
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    handleLogout() {
      this.logout();
      this.$router.push({ name : 'Landing' })
    }
  },
};
</script>

<style scoped>
.header {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #0e0e0e;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.logo-container {
  height: 100%;
}

.logo {
  max-height: 85%;
  object-fit: contain;
  cursor: pointer;
}

.menu {
  display: flex;
  gap: 15px;
}

button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  background-color: #FFD700;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1em;
}

button:hover {
  background-color: #FFC107;
}

button:focus {
  outline: none;
}
</style>
