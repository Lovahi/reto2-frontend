<script setup>
import { reactive } from 'vue';
const filtros = reactive({
    titulo: '',
    genero: '',
    plataforma: ''
});
</script>

<template>
    <div class="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
                <label class="block text-gray-400 text-sm mb-2">Buscar Juego</label>
                <input v-model="filtros.titulo" type="text" placeholder="Ej: Super Mario..."
                    class="w-full bg-gray-700 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
        </div>
    </div>
</template>