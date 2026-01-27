<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import Login from './views/Login.vue';
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-800 text-white font-sans">
    <NavbarComponent />

    <main class="flex-1 relative pt-24 px-4">
      <RouterView />
    </main>

    <Login /> 

    <FooterComponent />

  </div>
</template>

<style scoped></style>