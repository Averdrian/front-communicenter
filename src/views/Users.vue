<template>
  <div class="list-container">  
    <ViewTitle title="Usuarios"/>
    <div class="user-list">
      <h1 class="title">Listado de Usuarios</h1>
      <div class="user-items">
        <UserItem v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>

import ViewTitle from '@/components/ViewTitle.vue';
import UserItem from '../components/users/UserItem.vue';
import { users } from '@/routes/users';


export default {
  name: "UserList",
  components: {
    UserItem,
    ViewTitle
  
  },

  data() {
    return {
      users: [],

    };
  },

  async created() {
    this.users = await users();
  }

};
</script>

<style scoped>

.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
/*  background-color: #2c2c2c;*/
  width: 100%;
}

.user-list {
  width: 100%;
  padding: 20px;
  background-color: #1E1E1E;
  color: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  overflow-y: scroll;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #FFC107;
}

.user-items {
  display: ruby;
  flex-direction: column;
  gap: 10px;
}
</style>