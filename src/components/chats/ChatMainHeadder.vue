<template>
  <div class="header-left">
    <div 
      class="status-indicator tooltip" 
      :class="statusClass" 
      @click="toggleDropdown" 
      ref="dropdownToggle">
      <span class="tooltiptext">{{ chat.status_name }}</span>
      <div class="dropdown-menu" v-if="dropdownVisible" ref="dropdownMenu">
        <ul>
          <li v-for="status in statuses" v-bind:key="status.value" :value="status.value" @click="changeStatus(status.value)">{{ status.name }}</li>
        </ul>
      </div>
    </div>
    <!-- Elemento a la izquierda -->
  </div>
  <div class="header-center">
    <!-- Elemento al centro -->
    <span>{{ chat.whatsapp_name }}</span>
    &nbsp; &nbsp;
    <span>{{ formatPhoneNumber }}</span>
    &nbsp; &nbsp;
    <span :class="`fi fi-${chat.country}`"></span>
  </div>
  <div class="header-right">
    <i class="fa-solid fa-note-sticky notes-button" @click="clickNotes"></i>
    <!-- Elemento a la derecha -->
  </div>
</template>

<script>
import { AsYouType } from 'libphonenumber-js';
import { updateStatus } from '@/routes/chats';

export default {
  props: ['chat', 'statuses'],
  data() {
    return {
      dropdownVisible: false,
    }
  },
  computed: {
    statusClass() {
      return `status-${this.chat.status}`;
    },
    formatPhoneNumber() {
      return new AsYouType(this.chat.country).input('+' + this.chat.phone);
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // Alterna la visibilidad
    },

    clickNotes() {
      this.$emit('click-notes');
    },
    handleClickOutside(event) {
      const dropdownMenu = this.$refs.dropdownMenu;
      const dropdownToggle = this.$refs.dropdownToggle;
      if (
        dropdownMenu && !dropdownMenu.contains(event.target) &&
        dropdownToggle && !dropdownToggle.contains(event.target)
      ) {
        this.dropdownVisible = false; // Cierra el dropdown si se hace clic fuera de él
      }
    },
    async changeStatus(status_value) {
      let status = await updateStatus(this.chat.id, status_value);

      this.$emit('update-chat-status', status);
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2E2E2E;
  color: #FFFFFF;
  padding: 10px;
  border-bottom: 1px solid #3B3B3B;
  margin-bottom: 10px;
}

.header-left,
.header-center,
.header-right {
  flex: 1;
  text-align: center;
}

.header-left {
  text-align: left;
}

.header-right {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.status-indicator {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ccc;
  margin-left: 10px;
  cursor: pointer;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 10000;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
/*
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}*/

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 100%;
  background-color: #2e2e2e;
  border: 1px solid #fceb57;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 10px;
  border-radius: 4px;
  white-space: nowrap;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu ul li {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-menu ul li:hover {
  background-color: #fceb57;
  color:black;
}

.notes-button {
  color: #FFC107;
  font-size: x-large;
}

.notes-button:hover {
  cursor: pointer;
}
</style>
