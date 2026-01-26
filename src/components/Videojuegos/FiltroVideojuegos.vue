<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const filtro = ref('')
const filtrar = async () => {
  try {
    const respuesta = await fetch('URL_AQUI');
    store.listaJuegos = await respuesta.json();
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-gray-400 text-sm mb-2">Buscar Juego</label>
        <input
          @keyup="filtrar"
          v-model="filtro"
          type="text"
          placeholder="Ej: Super Mario..."
          class="w-full bg-gray-700 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  </div>
</template>
