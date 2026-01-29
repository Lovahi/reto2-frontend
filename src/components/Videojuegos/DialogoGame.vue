<script setup>
import DialogoBase from '../DialogoBase.vue'
import { useStore } from '@/stores/store'
const store = useStore();
</script>

<template>
    <DialogoBase>
        <div class="flex flex-col">
            <img :src="store.videoJuegoActual.image" class="w-full h-64 object-cover" />
            <div class="p-6 space-y-4">

                <h2 class="text-2xl font-bold text-emerald-600">{{ store.videoJuegoActual.title }}</h2>
                <div class="flex gap-2">
                    <span class="bg-gray-200 px-2 py-1 rounded text-sm font-bold">{{ store.videoJuegoActual.genre }}</span>
                </div>
                <p class="text-gray-600 break-words">{{ store.videoJuegoActual.description }}</p>
                
                <div class="pt-4 border-t">
                    <strong>Plataformas:</strong>
                    <span v-for="plat in store.videoJuegoActual.platforms" :key="plat" class="ml-1 text-sm text-gray-500">
                        {{ plat }}
                    </span>
                </div>
            </div>
        </div>

    </DialogoBase>
</template>