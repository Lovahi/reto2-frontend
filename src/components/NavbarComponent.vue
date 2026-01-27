<script setup>
// Necesitamos importar esto para que los enlaces funcionen
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav id="navbar"
    class="fixed top-4 left-[2.5%] w-[95%] z-50 flex justify-between items-center bg-[#4ab491] h-16 px-5 rounded-[10px] shadow-md transition-all">
    <div class="flex items-center gap-[10px] h-full">
      <img src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" alt="Logo"
        class="h-[50px] w-auto mix-blend-multiply contrast-[1.1]">
      <p class="text-white text-xl font-bold font-sans">GameFest</p>
    </div>

    <div class="flex gap-8 text-white font-medium">
      <RouterLink to="/" class="hover:text-emerald-100 transition-colors">Inicio</RouterLink>
      <RouterLink to="/videojuegos" class="hover:text-emerald-100 transition-colors">Juegos</RouterLink>
      <RouterLink to="/eventos" class="hover:text-emerald-100 transition-colors">Eventos</RouterLink>
    </div>

    <div class="flex flex-row items-center gap-[10px] text-white">
      <i class="pi pi-user text-xl"></i>
      <button
        class="bg-white text-[#4ab491] px-[15px] py-[5px] rounded font-bold hover:bg-gray-100 transition-colors shadow-sm">
        Login
      </button>
    </div>

  </nav>
</template>

<style scoped>
/* Clase automática de Vue Router para saber en qué página estás */
.router-link-active {
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 800;
}
</style>



<!-- src="../assets/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png"  -->
