<template>
    <div class="message" :class="{ 'from-user': message.user_id }">
      <p class="message-user">{{ message.user_id ? message.user_name  : ''}}</p>
      <div class="message-bubble">
        <p class="message-text">{{ message.message }}</p>
        <p class="message-time">{{ message.sent_at }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Message',
    props: {
      message: Object,
    },
  };
  </script>
  
  <style scoped>
  .message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
  }
  
  .from-user {
    align-items: flex-end;
  }
  
  .message-user {
    font-weight: bold;
    margin-bottom: 5px;
    color: #888;
  }
  
  .message-bubble {
    max-width: 70%;
    padding: 10px;
    border-radius: 15px;
    background-color: #2a2a2a;
    color: #ddd;
    position: relative;
    word-wrap: break-word;
  }
  
  .message-bubble::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
  }
  
  .from-user .message-bubble {
    background-color: #4a4a4a;
  }
  
  .from-user .message-bubble::after {
    right: -20px;
    border-left-color: #4a4a4a;
    border-right: 0;
    margin-top: -10px;
  }
  
  .message-bubble::after {
    left: -20px;
    border-right-color: #2a2a2a;
    border-left: 0;
    margin-top: -10px;
  }
  
  .message-text {
    margin: 0;
  }
  
  .message-time {
    font-size: 0.8em;
    color: #888;
    text-align: right;
  }
  </style>
  