<template>

  <title>
    Communicenter
  </title>

  <div id="app">
    <router-view />
  </div>
</template>

<script>

//  import routerView from "vue-router";

export default {
  name: 'App',
  components: {
    // routerView
  },



}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #323232;
}

body {
  margin: 0px;
}

#app {
  height: 100vh;
}
</style>  
