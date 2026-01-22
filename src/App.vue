<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



</script>
<template>
  <div id="app">
    <NavbarComponent />
  </div>
  <div>
    <RouterView />
  </div>

  <div>
    <FooterComponent />
  </div>

</template>

<style scoped></style>