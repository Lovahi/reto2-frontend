<script setup>
import { RouterLink, RouterView } from 'vue-router'
import prueba from './views/Prueba.vue';
import Videojuegos from './views/Videojuegos.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



</script>

<template>
    <div>
    <RouterView />
  </div>
  <div id="app">
  <NavbarComponent />
</div>
  <div class="min-h-screen bg-gray-900 text-white"> <NavBar />
  <h1 class="bg-emerald-500 text-center">GameFest!</h1>
  <!-- <RouterView /> -->
    <prueba />
    <Videojuegos />
  </div>

  <div>
    <FooterComponent />
  </div>

</template>

<style scoped>


</style>
