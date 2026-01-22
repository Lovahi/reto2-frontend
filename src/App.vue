<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<template>
  <div id="app">
    <NavbarComponent />
  </div>
  <div>
    <RouterView />
  </div>

</template>

<style scoped></style>