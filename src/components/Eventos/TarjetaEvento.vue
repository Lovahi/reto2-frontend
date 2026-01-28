<script setup>
import { useStore } from '@/stores/store.js'
import TarjetaBase from '../TarjetaBase.vue'
const store = useStore()
defineEmits(['abrirModal'])
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
    <tarjeta-base v-for="(evento, index) in store.listaEventos" :key="index" @click="$emit('abrirModal', evento)"
      class="cursor-pointer hover:shadow-xl transition">
      <template #image>
        <img class="h-48 w-full object-cover" :src="evento.image" alt="Imagen del evento" />
      </template>
      <template #titulo> Título: {{ evento.titulo }} </template>
      <template #fecha> Fecha: {{ evento.fecha }} </template>
      <template #hora> Hora: {{ evento.hora }} </template>
      <template #plazas> Plazas libres: {{ evento.plazas }} </template>
    </tarjeta-base>
  </div>
</template>
<style scoped></style>
