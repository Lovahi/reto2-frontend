<script setup>
import DialogoBase from '../DialogoBase.vue';
import { ref, computed } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import { useStore } from '@/stores/store.js';

const store = useStore();
const checked = ref(false);

const props = defineProps({
    evento: { type: Object, required: true }
})

defineEmits(['cerrar', 'inscribirse', 'desapuntarse'])

const yaInscrito = computed(() => store.estoyInscrito(props.evento.id));
</script>

<template>
    <DialogoBase @cerrar="$emit('cerrar')">
        <div class="flex flex-col">
            <img :src="evento.image || 'https://placehold.co/600x400?text=No+Image'" class="w-full h-64 object-cover"
                alt="Detalle del evento" />

            <div class="p-6 space-y-4">

                <h2 class="text-2xl font-bold text-cyan-600">
                    {{ evento.title || evento.titulo }}
                </h2>

                <div class="flex gap-2">
                    <span class="bg-gray-200 px-2 py-1 rounded text-sm font-bold">
                        {{ evento.date || evento.fecha }}
                    </span>
                </div>

                <p class="text-gray-600">
                    {{ evento.time || evento.hora }}
                </p>

                <div class="pt-4 border-t space-y-4">
                    <div>
                        <strong>Plazas:</strong>
                        <span class="ml-1 text-sm text-gray-500">
                            {{ evento.availablePlaces || evento.plazas }} plazas libres
                        </span>
                    </div>

                    <div v-if="yaInscrito" class="space-y-3 text-center animate-fade-in-up">
                        <div
                            class="p-3 bg-cyan-100 text-cyan-800 rounded font-bold border border-cyan-300 flex items-center justify-center gap-2">
                            <i class="pi pi-check-circle"></i>
                            ¡Ya estás inscrito!
                        </div>
                        <button @click="$emit('desapuntarse')"
                            class="text-red-500 underline text-sm hover:text-red-700 transition-colors">
                            Cancelar mi inscripción
                        </button>
                    </div>

                    <div v-else class="space-y-4">
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
        </div>
    </DialogoBase>
</template>