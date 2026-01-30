<script setup>
import DialogoBase from '../DialogoBase.vue';
import { ref } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
const checked = ref(false);

defineProps({
    evento: {
        type: Object,
        required: true
    }
})
defineEmits(['cerrar', 'inscribirse']) 
</script>

<template>
    <DialogoBase @cerrar="$emit('cerrar')">
        <div class="flex flex-col">
            <img :src="evento.image" class="w-full h-64 object-cover" />
            <div class="p-6 space-y-4">

                <h2 class="text-2xl font-bold text-cyan-600">{{ evento.titulo }}</h2>
                <div class="flex gap-2">
                    <span class="bg-gray-200 px-2 py-1 rounded text-sm font-bold">{{ evento.fecha }}</span>
                </div>
                <p class="text-gray-600">{{ evento.hora }}</p>

                <div class="pt-4 border-t space-y-4">
                    <div>
                        <strong>Plazas:</strong>
                        <span class="ml-1 text-sm text-gray-500">
                            {{ evento.plazas }} plazas libres
                        </span>
                    </div>

                    <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <ToggleSwitch v-model="checked">
                            <template #handle="{ checked }">
                                <i :class="['!text-xs pi', { 'pi-check': checked, 'pi-times': !checked }]" />
                            </template>
                        </ToggleSwitch>
                        <span class="text-sm text-gray-700">QUIERO INSCRIBIRME!</span>
                    </div>

                    <button :disabled="!checked"
                        class="w-full py-2 px-4 rounded font-bold text-white transition-all duration-200"
                        :class="checked ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-400 cursor-not-allowed'"
                        @click="$emit('inscribirse')">
                        Confirmar Inscripción
                    </button>

                </div>
            </div>
        </div>

    </DialogoBase>
</template>