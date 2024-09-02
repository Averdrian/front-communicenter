<template>
  <div class="chat-list-container">
    <div class="status-selector-container">
      <div class="custom-select">
        <div class="select-box" @click="toggleDropdown">
          <span class="selected-items">Estados seleccionados</span>
          <i class="arrow-down"></i>
        </div>
        <div v-if="dropdownOpen" class="options-container">
          <label v-for="status in statuses" :key="status.value" class="status-option checkbox-status">
            <input :checked="selected_statuses[status.value] == true" type="checkbox" :value="status.value" @change="selected_statuses[status.value] = !selected_statuses[status.value]" />
            {{ status.name }}
          </label>
        </div>
      </div>
      <button class="search-button" @click="searchStatuses">Buscar</button>
    </div>
    <div class="chat-list" id="chat-list" @scroll="handleScroll">
      <ChatCard @click="select_chat(n)" v-for="n in chat_list" :chat="n" :selected="n.id == selected_chat?.id" :key="n.id" />
    </div>
  </div>
</template>


  
  <script>
import ChatCard from './ChatCard.vue';
  
  export default {
    name: 'ChatCardList',
    components: {
      ChatCard,
    },
    props: ['chat_list', 'selected_chat', 'statuses'],

    data() {
      return {
        loading: false,
        selected_statuses: [],
        dropdownOpen: false,
      };
    },

    mounted() {
      this.selected_statuses = this.statuses.map((status) => {
        return (status.value, status.name, true)
      })
    },

    watch : {
      statuses(newVal) {
        this.selected_statuses = newVal.map((status) => {
          return (status.value, true)
        })
      }
    },

    methods : {
        select_chat(chat) {
            this.$emit('selected', chat);
        },
        toggleDropdown() {
          this.dropdownOpen = !this.dropdownOpen;
        },
        handleScroll() {
          const chatslist = document.getElementById('chat-list');
          if(chatslist.scrollHeight - chatslist.clientHeight - chatslist.scrollTop  < 30 && !this.loading) {
            this.loading = true;
            this.$emit('load-chats')
          }
        },
        unlockLoad() {
          this.loading = false;
        },
        checkLoadMore() {
          const chatslist = document.getElementById('chat-list');
          if (chatslist.scrollHeight <= chatslist.clientHeight && !this.loading) {
            this.loading = true;
            this.$emit('load-chats');
          }
        },
        searchStatuses() {
          const selected = this.selected_statuses.map((value, index) => value ? index : -1).filter(index => index !== -1);
          this.$emit('filter-chats', selected)
        }

    }
  
};
  </script>
  
  <style scoped>
  .chat-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 95%;
    padding-right: 5px;
    padding-left: 5px;
    overflow-x: hidden;
  }
  
  .status-selector-container {
    height: 5%;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .chat-list-container {
    overflow-y: hidden;
    height: 100%;
  }
  
  .select-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: #2E2E2E;
    color: #fff;
    border: 1px solid #FFC107;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }
  
  .arrow-down {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  
  .options-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #2E2E2E;
    border: 1px solid #FFC107;
    border-radius: 4px;
    margin-top: 2px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .status-option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
  }
  
  .status-option:hover {
    background-color: #3E3E3E;
  }
  
  .status-option input[type="checkbox"] {
    margin-right: 8px;
  }
  
  .selected-items {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85%;
  }
  
  .search-button {
    margin-left: 10px;
    padding: 8px 12px;
    background-color: #FFC107;
    border: none;
    border-radius: 4px;
    color: #2E2E2E;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #E0A800;
  }
  </style>
  
  