<template>
    <div class="header-left">
      <div class="status-indicator tooltip" :class="statusClass">
        <span class="tooltiptext">{{ chat.status_name }}</span>
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
        <!-- <span>{{ chat.status_name }}</span> -->
      </div>

      
</template>


<script>

import { AsYouType } from 'libphonenumber-js';



    export default {
        props : ['chat'],
        computed : {
          statusClass() {
            return `status-${this.chat.status}`;
          },
          formatPhoneNumber() {
            return new AsYouType(this.chat.country).input('+' + this.chat.phone);
          },

        },

        methods : {
          clickNotes() {
            this.$emit('click-notes');
          }
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
  margin-bottom: 10px; /* Añade espacio entre la barra y los mensajes */
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
  margin-left: 10px; /* Espacio entre el nombre y el indicador de estado */
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
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


.notes-button {
    color: #FFC107;
    font-size: x-large;
}

.notes-button:hover {
  cursor:pointer;
}



</style>