<script setup>
import DialogoBase from '../DialogoBase.vue';

defineProps({
    evento: {
        type: Object,
        required: true
    }
})
defineEmits(['cerrar'])
</script>

<template>
    <DialogoBase @cerrar="$emit('cerrar')">
        <div class="flex flex-col">
            <img :src="evento.image" class="w-full h-64 object-cover" />
            <div class="p-6 space-y-4">

                <h2 class="text-2xl font-bold text-emerald-600">{{ evento.titulo }}</h2>
                <div class="flex gap-2">
                    <span class="bg-gray-200 px-2 py-1 rounded text-sm font-bold">{{ evento.fecha }}</span>
                </div>
                <p class="text-gray-600">{{ evento.hora }}</p>
                
                <div class="pt-4 border-t">
                    <strong>Plazas:</strong>
                    <span class="ml-1 text-sm text-gray-500">
                        {{ evento.plazas }} plazas libres
                    </span>
                </div>
            </div>
        </div>

    </DialogoBase>
</template>