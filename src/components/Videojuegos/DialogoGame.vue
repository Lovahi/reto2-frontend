<script setup>
import DialogoBase from '../DialogoBase.vue';

// Recibe el juego que tiene que mostrar
defineProps({
    juego: {
        type: Object,
        required: true
    }
})
defineEmits(['cerrar'])
</script>

<template>
    <DialogoBase @cerrar="$emit('cerrar')">
        <div class="flex flex-col">
            <img :src="juego.image" class="w-full h-64 object-cover" />
            <div class="p-6 space-y-4">

                <h2 class="text-2xl font-bold text-emerald-600">{{ juego.titulo }}</h2>
                <div class="flex gap-2">
                    <span class="bg-gray-200 px-2 py-1 rounded text-sm font-bold">{{ juego.genero }}</span>
                </div>
                <p class="text-gray-600 break-words">{{ juego.descripcion }}</p>
                
                <div class="pt-4 border-t">
                    <strong>Plataformas:</strong>
                    <span v-for="plat in juego.plataformas" :key="plat" class="ml-1 text-sm text-gray-500">
                        {{ plat }}
                    </span>
                </div>
            </div>
        </div>

    </DialogoBase>
</template>