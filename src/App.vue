<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-900 text-white">

    <NavbarComponent />

    <main class="p-4">
      <RouterView />
    </main>

  </div>
</template>

<style scoped>
</style>