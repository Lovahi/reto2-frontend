<script setup>
import FiltroVideojuegos from '../components/Videojuegos/FiltroVideojuegos.vue';
import TarjetaGame from '@/components/Videojuegos/TarjetaGame.vue';

</script>

<template>
    <div class="container mx-auto p-4 md:p-10">

        <h1 class="font-bold text-emerald-500 mb-8 text-center">Juegos </h1>
        <FiltroVideojuegos />
        <tarjeta-game />

    </div>
</template>