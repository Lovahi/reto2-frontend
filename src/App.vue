<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col text-black font-sans">
    <NavbarComponent />

    <main class="flex-1 relative">
      <RouterView />
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped></style>
