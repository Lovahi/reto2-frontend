<script setup>
import { onMounted } from 'vue'
import TarjetaBase from '../TarjetaBase.vue'
import { useStore } from '@/stores/store'

const store = useStore()

defineEmits(['abrirModal'])

onMounted(() => {
  store.cargarJuegos();
  store.cargarContador();
})
</script>

<template>
  <div v-if="store.listaJuegos.length > 0">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
      <tarjeta-base
        v-for="(juego, index) in store.listaJuegos"
        :key="index"
        @click="$emit('abrirModal', juego)"
      >
        <template #image>
          <img class="h-48 w-full object-cover" :src="juego.image" alt="Imagen del videojuego" />
        </template>

        <template #titulo> <strong>Título:</strong> {{ juego.title }} </template>

        <template #genero> <strong>Género:</strong> {{ juego.genre }} </template>

        <template #descripcion> <strong>Descripción:</strong> {{ juego.description }} </template>

        <template #plataformas>
          <strong>Plataformas:</strong>
          <span v-for="(plataforma, pIndex) in juego.platforms" :key="pIndex">
            {{ plataforma }}{{ pIndex < juego.platforms.length - 1 ? ', ' : '' }}
          </span>
        </template>
      </tarjeta-base>
    </div>
    <div class="flex flex-row gap-10">
      <button class="bg-white border-black border-2 p-5 rounded-lg" v-for="numero in store.paginasGames" @click="store.cargarJuegos(numero)">{{ numero }}</button>
    </div>
  </div>
  <div v-else class="text-center text-white py-10">
    <p>No se encontraron juegos o cargando...</p>
  </div>
</template>

<style scoped></style>
