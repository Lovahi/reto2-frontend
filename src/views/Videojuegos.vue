<script setup>
import { ref } from 'vue';
import FiltroVideojuegos from '../components/Videojuegos/FiltroVideojuegos.vue';
import TarjetaGame from '@/components/Videojuegos/TarjetaGame.vue';
import DialogoGame from '@/components/Videojuegos/DialogoGame.vue';

// --- LÓGICA DEL MODAL ---
const juegoSeleccionado = ref(null); // Al principio no hay ninguno seleccionado

const abrirElModal = (juegoClickado) => {
    juegoSeleccionado.value = juegoClickado;
};

const cerrarElModal = () => {
    juegoSeleccionado.value = null; 
};
</script>

<template>
    <div class="container mx-auto p-4 md:p-10">
        <h1 class="font-bold text-emerald-500 mb-8 text-center">Juegos</h1>

        <FiltroVideojuegos />

        <TarjetaGame @abrirModal="abrirElModal" />

        <DialogoGame v-if="juegoSeleccionado" :juego="juegoSeleccionado" @cerrar="cerrarElModal" />

    </div>
</template>