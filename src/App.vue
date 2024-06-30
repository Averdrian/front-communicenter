<template>

  <Header class="header"/>

  <div id="app" class="view">
    <router-view />
  </div>
</template>

<script>


import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header,
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

/*#app {
  height: 100vh;
}*/

.header {
  height: 10vh;
  max-height: 10vh !important;
  display:contents;
}

.view {
  height: 90vh !important;
}


</style>  
