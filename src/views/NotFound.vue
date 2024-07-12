<template>
    <div>
      <ViewTitle title="Not Found"/>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  </template>
  
  <script>
import ViewTitle from '@/components/ViewTitle.vue';

  export default {
    name: 'NotFound',
    components: {
        ViewTitle
    }
  };
  </script>
  