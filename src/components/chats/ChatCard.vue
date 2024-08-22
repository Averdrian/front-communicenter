<template>
    <div class="chat-card">
      <div class="card-header">
        <span class="phone-number">{{ formatPhoneNumber }}</span>
        <span class="whatsapp-name">{{ chat.whatsapp_name }}</span>
      </div>
      <div class="card-body">
        <span class="last-message-time" :class="chat.time_left < 3600 ? 'little-time' : ''">{{ formatTime(chat.time_left) }} <i class="fa-solid fa-clock"></i></span>
        <span class="last-message-date">{{ chat.last_message_at }}</span>
      </div>
      <div class="status-indicator tooltip" :class="statusClass">
        <span class="tooltiptext">{{ chat.status_name }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { AsYouType } from 'libphonenumber-js';
  
  export default {
    props: {
      chat: {
        type: Object,
        required: true,
      },
    },
    computed: {
      formatPhoneNumber() {
        return new AsYouType(this.chat.country).input('+' + this.chat.phone);
      },
      statusClass() {
            return `status-${this.chat.status}`;
          },
      
    },

    methods : {
      formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${this.pad(hours)}:${this.pad(remainingMinutes)}`;
      },
      pad(num) {
        return num < 10 ? '0' + num : num;
      }
    }

  };
  </script>
  
  <style scoped>
  .chat-card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    margin: 0.3em 0;
    border: 1px solid #444;
    border-radius: 10px;
    background-color: #444444;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .chat-card:hover {
    background-color: #2a2a2a;
  }
  
  .card-header, .card-body {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .phone-number, .whatsapp-name, .last-message-time, .last-message-date {
    font-size: 1em;
    font-weight: bold;
  }
  
  .phone-number, .last-message-time {
    text-align: left;
  }
  
  .whatsapp-name, .last-message-date {
    text-align: right;
    margin-right: 50px; /* Añade margen para evitar colisión con el círculo */
  }
  
  .status-indicator {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
  }

  

  .tooltip {
    display: inline-block;
    border-bottom: 1px dotted black;
    z-index: 10;
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
    z-index: 20; /* Asegúrate de que el tooltip esté por encima de otros elementos */
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
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
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .little-time {
    color: red;
  }

  </style>
  