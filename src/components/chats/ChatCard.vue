 <template>
    <div class="chat-card">
      <div class="card-header">
        <span>{{ chat.phone }}</span>
      </div>
      <div class="card-body">
        <span>{{ formattedLastMessageAt }}</span>
      </div>
      <div class="status-indicator tooltip" :class="statusClass"><span class="tooltiptext">{{ chat.status_name }}</span></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      chat: {
        type: Object,
        required: true,
      },
    },
    created() {
        console.log(this.chat)
    },
    computed: {
      formattedLastMessageAt() {
        // Formatea la fecha del último mensaje
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(this.chat.last_message_at).toLocaleString('es-ES', options);
      },
      statusClass() {
        // Devuelve una clase basada en el estado
        return `status-${this.chat.status}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: 0.5em 0;
    border: 1px solid #444;
    border-radius: 10px;
    background-color: #444444;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

.chat-card:hover {
    background-color: #2a2a2a;
}

  
  .card-header {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .card-body {
    font-size: 1em;
  }
  
  .status-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc; /* Color genérico, cámbialo según el estado */
  }
  
  .status-1 {
    background-color: #9e5a2d; 
  }
  
  .status-2 {
    background-color: #00ff00; 
  }
  
  .status-3 {
    background-color: #ff0000; 
  }

  .tooltip {
    position: relative;
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
  