<template>
  <head><title>Communicenter</title></head>
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
  overflow-x: hidden !important;
}

/* Personalización del scrollbar para navegadores basados en WebKit (Chrome, Safari) */
::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar vertical */
  height: 12px; /* Alto del scrollbar horizontal */
}

::-webkit-scrollbar-track {
  background: #2E2E2E; /* Color de fondo del track del scrollbar */
  border-radius: 10px; /* Bordes redondeados del track */
}

::-webkit-scrollbar-thumb {
  background: #FFC107; /* Color del thumb del scrollbar */
  border-radius: 10px; /* Bordes redondeados del thumb */
  border: 3px solid #2E2E2E; /* Espacio alrededor del thumb para dejar el track visible */
}

::-webkit-scrollbar-thumb:hover {
  background: #FFB300; /* Color del thumb del scrollbar al pasar el mouse */
}

/* Personalización del scrollbar para Firefox */
* {
  scrollbar-width:thin; /* Grosor del scrollbar */
  scrollbar-color: #FFC107 #2E2E2E; /* Color del thumb y el track del scrollbar */
}


</style>  
