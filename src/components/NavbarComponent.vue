<script setup>
// Necesitamos importar esto para que los enlaces funcionen
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <nav id="navbar"
    class="fixed top-4 left-[2.5%] w-[95%] z-50 bg-[#4ab491] rounded-[10px] shadow-md transition-all">
    
    <div class="flex justify-between items-center h-16 px-5">
      
      <div class="flex items-center gap-[10px] h-full">
        <img src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png" 
             alt="Logo"
             class="h-[50px] w-auto mix-blend-multiply contrast-[1.1]">
        <p class="text-white text-xl font-bold font-sans">GameFest</p>
      </div>

      <div class="hidden md:flex gap-8 text-white font-medium">
        <RouterLink to="/" class="hover:text-emerald-100 transition-colors">Inicio</RouterLink>
        <RouterLink to="/videojuegos" class="hover:text-emerald-100 transition-colors">Juegos</RouterLink>
        <RouterLink to="/eventos" class="hover:text-emerald-100 transition-colors">Eventos</RouterLink>
      </div>

      <div class="flex items-center gap-4 text-white">
        <RouterLink to="/login" class="flex items-center hover:text-emerald-100 transition-colors">
          <i class="pi pi-user text-2xl"></i>
          <span class="hidden md:block ml-2 bg-white text-[#4ab491] px-[15px] py-[5px] rounded font-bold">
            Login
          </span>
        </RouterLink>

        <button @click="isOpen = !isOpen" class="md:hidden text-2xl focus:outline-none">
          <i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>
      </div>
    </div>

    <div v-show="isOpen" class="md:hidden flex flex-col gap-4 px-5 pb-5 text-white font-medium border-t border-emerald-400 pt-4">
      <RouterLink to="/" @click="isOpen = false" class="hover:text-emerald-100">Inicio</RouterLink>
      <RouterLink to="/videojuegos" @click="isOpen = false" class="hover:text-emerald-100">Juegos</RouterLink>
      <RouterLink to="/eventos" @click="isOpen = false" class="hover:text-emerald-100">Eventos</RouterLink>
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
