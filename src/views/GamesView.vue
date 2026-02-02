<script setup>
import { ref } from 'vue'
import GameFilter from '../components/Videojuegos/FiltroVideojuegos.vue'
import GameCard from '@/components/Videojuegos/TarjetaGame.vue'
import GameDialog from '@/components/Videojuegos/DialogoGame.vue'

// --- MODAL LOGIC ---
const selectedGame = ref(null)

const openModal = (clickedGame) => {
  selectedGame.value = clickedGame
}

const closeModal = () => {
  selectedGame.value = null
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-10 pt-24 text-[var(--text-main)]">
    <h1
      class="text-4xl font-black italic text-[var(--primary)] mb-8 uppercase tracking-tighter text-center"
    >
      Juegos
    </h1>

    <GameFilter />

    <GameCard @abrirModal="openModal" />

    <GameDialog v-if="selectedGame" :juego="selectedGame" @cerrar="closeModal" />
  </div>
</template>
