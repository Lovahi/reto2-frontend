<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
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

</template>

<style scoped>
</style>