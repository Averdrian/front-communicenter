<template>
  <ViewTitle title="Landing"/>
  <div class="landing-page">
    <img src="logo.png" alt="App Logo" class="app-logo" />
    <h1 class="app-title">Communicenter</h1>
    <h2 class="app-subtitle">{{subtitle_text}}</h2>
    <div class="buttons-section">
      <AdminButtons v-if="isAdminOrganization"></AdminButtons>
      <ManagerButtons v-else-if="isManager"></ManagerButtons>
      <UserButtons v-else-if="isAuthenticated"></UserButtons>
      <GuestButtons v-else/>
    </div>
  </div>
</template>

<script>
import GuestButtons from '@/components/landing/GuestButtons.vue';
import UserButtons from '@/components/landing/UserButtons.vue';
import ManagerButtons from '@/components/landing/ManagerButtons.vue';
import AdminButtons from '@/components/landing/AdminButtons.vue';
import ViewTitle from '@/components/ViewTitle.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'LandingPage',
  components: {
    ViewTitle,
    GuestButtons,
    UserButtons,
    ManagerButtons,
    AdminButtons
  },
  computed: {
    ...mapGetters(['user','isAuthenticated', 'isManager', 'isAdminOrganization'])
  },
  data() {
    return {
      subtitle_text : ''
    }
  },
  mounted() {
    this.setSubtitleText();
  },
  watch : {
    user : {
      immediate: true,
      handler() {
        this.setSubtitleText();
      }
    }
  },
  methods : {
    setSubtitleText() {
      if(this.user != null) {
      this.subtitle_text = `Hola ${this.user.username}`;
    }
    else this.subtitle_text = 'Inicie sesión para operar';
    }
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Cambiado a flex-start para alinear elementos en la parte superior */
  height: 100%;
  background-color: #1E1E1E;
  text-align: center;
  padding: 20px;
  padding-top: 50px; /* Ajusta este valor según sea necesario */
}

.app-logo {
  width: 200px;
  margin-bottom: 20px;
}

.app-title {
  font-size: 36px;
  color: #FFFFFF;
  margin-bottom: 10px;
}

.app-subtitle {
  font-size: 26px;
  color: #FFFFFF;
  margin-bottom: 50px;
}

.buttons-section {
  width: 100%;
  max-width: 800px;
}
</style>
