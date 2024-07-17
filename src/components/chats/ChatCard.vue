<template>
    <div class="chat-card">
      <div class="card-header">
        <span class="phone-number">{{ formatPhoneNumber }}</span>
        <span class="whatsapp-name">{{ chat.whatsapp_name }}</span>
      </div>
      <div class="card-body">
        <span class="last-message-time">00:00</span>
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
  };
  </script>
  
  <style scoped>
  .chat-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
    margin: 0.5em 0;
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

  .status-0 {
    background-color: #9e5a2d;
  }
  
  .status-1 {
    background-color: #000000;
  }
  
  .status-2 {
    background-color: #09f0f8;
  }
  
  .status-3 {
    background-color: #ff0000;
  }
  
  .status-4 {
    background-color: #d6b211;
  }

  .status-5 {
    background-color: #51ff00;
  }

  .status-6 {
    background-color: #174900;
  }

  .status-7 {
    background-color: #ff8800;
  }

  .tooltip {
    display: inline-block;
    border-bottom: 1px dotted black;
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
  </style>
  