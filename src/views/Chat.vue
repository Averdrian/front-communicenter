<template>
  <ViewTitle title="Chats"/>
  <div class="chat-container">
    <div class="sidebar">
      <ChatCardList @selected="selectedChat" @filter-chats="loadFilterChats" @load-chats="loadChats" :statuses="statuses" :selected_chat="selected_chat" :chat_list="chat_list" ref="chat_card_list"/>
    </div>
    <div class="main-chat">
      <ChatMain @update-chat-status='updateChatStatus' v-if="selected_chat" :chat="selected_chat" :statuses="statuses" @sended_message="sendedMessage" ref="chat_main"/>  
    </div>
  </div>
</template>

<script>
import ViewTitle from '@/components/ViewTitle.vue';
import ChatCardList from '@/components/chats/ChatCardList.vue';
import ChatMain from '@/components/chats/ChatMain.vue'
import {chats, getChat, statuses} from '@/routes/chats';
import io from 'socket.io-client';
import { mapGetters } from 'vuex';

export default {
  name: 'chat',
  components : {
    ViewTitle,
    ChatCardList,
    ChatMain
  },
  computed : {
    ...mapGetters(['user'])
  },
  data() {
    return {
      chat_list : [],
      more_chats: true,
      last_timestamp: null,
      statuses: [],
      selected_chat : null,
      socket_messages : null,
      socket_status : null,
      interval_id : null,
      selected_statuses: null,
    }
  },
  async created() {
    let chats_data = await chats();
    this.chat_list = chats_data.chats;
    this.more_chats = chats_data.more;
    this.last_timestamp = chats_data.last_timestamp;

    this.statuses = await statuses();
    

    this.chat_list.forEach(chat => {
      this.updateTimeLeft(chat);
    });
    this.interval_id = setInterval(this.updateTimers, 1000);
  },
  async mounted() {
    this.socket_messages = io(process.env.VUE_APP_API_BASE_URL);
    this.socket_status = io(process.env.VUE_APP_API_BASE_URL);

    this.socket_messages.on('receive-message-'+this.user.organization_id, (message) => {
      if(this.selected_chat?.id === message.chat_id) {
        this.$refs.chat_main.receiveMessage(message.id);
      }  
      
      this.receiveMessage(message.chat_id, message.new_chat_status, message.new_chat_status_name, message.new_expires_at);
    });

    this.socket_messages.on('chat-status-'+this.user.organization_id, (chat_status_data) => {
      const index = this.chat_list.findIndex(chat => chat.id === chat_status_data.chat_id);
        if(index != -1) {
          this.chat_list[index].status = chat_status_data.status;
          this.chat_list[index].status_name = chat_status_data.status_name
        }
    });

  },  
  beforeUnmount() {
    if(this.socket_messages)
      this.socket_messages.close();
    if(this.socket_status)
      this.socket_status.close();
    clearInterval(this.interval_id);
    },
  methods : {
    selectedChat(chat) {
      if(this.selected_chat) {
        this.socket_status.close();
      }

      this.selected_chat = chat;
      this.socket_messages.on('receive-status-'+this.selected_chat.id, (message_data) => {
        this.$refs.chat_main.newMessageStatus(message_data.message_id, message_data.status);
      });
    },

    sendedMessage(message) {
      this.receiveMessage(message.chat_id, message.new_chat_status,message.new_chat_status_name, 0);
    },

    async receiveMessage(chat_id, new_status, new_status_name, new_expires_at) {
        const index = this.chat_list.findIndex(chat => chat.id === chat_id);
        if(index == -1) {
          let chat = await getChat(chat_id);
          this.updateTimeLeft(chat);
          this.chat_list.unshift(chat);
        }
        else {
          const [chat] = this.chat_list.splice(index, 1);
          chat.status = new_status;
          chat.status_name = new_status_name;

          if(new_expires_at){
            chat.expires_at = new_expires_at;
            this.updateTimeLeft(chat);
          }

          this.chat_list.unshift(chat);
        }
    },

    async loadChats() {
      if(!this.more_chats) {
        return;
      }
      let chats_data = await chats(this.last_timestamp, this.selected_statuses);
      chats_data.chats.forEach((chat) => {
        this.updateTimeLeft(chat)
      })
      this.chat_list = this.chat_list.concat(chats_data.chats)
      this.more_chats = chats_data.more;
      this.last_timestamp = chats_data.last_timestamp;

      this.$refs.chat_card_list.unlockLoad();
    },

    updateTimeLeft(chat) {
      const expiresAt = new Date(chat.expires_at).getTime();
      const now = new Date().getTime();
      chat.time_left = Math.max(0, Math.floor((expiresAt - now) / 1000));
    },

    updateTimers() {
      this.chat_list.forEach(chat => {
        if(chat.time_left > 0)
          --chat.time_left;
      });
    },
    updateChatStatus(status) {
      this.selected_chat.status_name = status.name;
      this.selected_chat.status = status.value;
    },
    async loadFilterChats(statuses) {
      this.selected_statuses = statuses;
      this.last_timestamp = null;
      let chats_data = await chats(null, this.selected_statuses)
      chats_data.chats.forEach((chat) => {
        this.updateTimeLeft(chat)
      })
      this.chat_list = chats_data.chats;
      this.more_chats = chats_data.more;
      this.last_timestamp = chats_data.last_timestamp;
      this.$refs.chat_card_list.unlockLoad();

    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10vh); /* Resta el tamaño del header */
  overflow: hidden; /* Evita el desbordamiento */
}

.sidebar {
  flex: 0 0 350px;
  background-color: #1e1e1e; /* Color de fondo más oscuro */
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto; /* Habilita el scroll vertical */
}

.main-chat {
  flex: 1;
  background-color: #2f2e2e; /* Color de fondo aún más oscuro */
  padding: 10px;
  box-sizing: border-box;
  color: #ddd; /* Color del texto más claro */
  overflow: hidden; /* Evita el desbordamiento horizontal */
}

@media (min-width: 750px) {
  .chat-container {
    flex-direction: row;
  }
}
</style>
