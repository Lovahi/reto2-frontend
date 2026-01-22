<script setup>
import { useCounterStore } from '@/stores/counter.js'
import TarjetaBase from './TarjetaBase.vue'
const store = useCounterStore()
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
    <tarjeta-base v-for="(juego, index) in store.listaJuegos" :key="index">
      <template #image>
        <img class="h-48 w-full object-cover" :src="juego.image" alt="Imagen del evento" />
      </template>
      <template #titulo> Título: {{ juego.titulo }} </template>
      <template #genero> Genero: {{ juego.genero }} </template>
      <template #descripcion> descripcion: {{ juego.descripcion }} </template>
      <template #plataformas> Plataformas: 
        <span v-for="plataforma in juego.plataformas">
            {{ plataforma }}
        </span> </template>
    </tarjeta-base>
  </div>
</template>
<style scoped></style>
