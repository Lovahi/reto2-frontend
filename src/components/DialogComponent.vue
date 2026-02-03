<script setup>
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'
import { ref, computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
  // 'game' o 'event' para saber qué campos mostrar
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'close', 'action'])

const checked = ref(false)

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
  checked.value = false
}

// Configuración dinámica según el tipo de contenido
const config = computed(() => {
  if (props.type === 'game') {
    return {
      badge: props.item?.genre || 'Videojuego',
      badgeClass: 'bg-(--primary)',
      imageFolder: 'games',
      actionLabel: 'Ver Eventos Disponibles',
      descriptionLabel: 'Acerca de la obra',
      accentColor: 'var(--primary)',
    }
  }
  return {
    badge: props.item?.type || 'Evento',
    badgeClass: 'bg-(--secondary)',
    imageFolder: 'events',
    actionLabel: 'Confirmar Inscripción',
    descriptionLabel: 'Detalles del evento',
    accentColor: 'var(--secondary)',
  }
})

const getImageUrl = (data) => {
  if (data?.image && data.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/${config.value.imageFolder}/${data.image}`
  }
  const color = props.type === 'game' ? 'ff8b00' : 'e10600'
  return `https://placehold.co/600x400/1a1d23/${color}?text=${encodeURIComponent(data?.title || 'Detalles')}`
}
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="(val) => $emit('update:visible', val)"
    modal
    class="w-[95%] max-w-2xl border-none shadow-none"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    :draggable="false"
    :closable="false"
    @hide="handleClose"
  >
    <!-- Estado de Carga -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center py-32 bg-(--surface) rounded-3xl border border-(--border-color)/50 shadow-2xl"
    >
      <i class="pi pi-spin pi-spinner text-5xl text-(--primary) mb-4"></i>
      <p class="text-xs font-black uppercase tracking-widest text-(--text-muted)">
        Sincronizando con la API...
      </p>
    </div>

    <!-- Contenido Principal -->
    <div
      v-else-if="item && item.id"
      class="flex flex-col bg-(--surface) text-(--text-main) rounded-3xl overflow-hidden border border-(--border-color)/50 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
    >
      <!-- HERO SECTION -->
      <div class="relative h-64 md:h-80 overflow-hidden">
        <img :src="getImageUrl(item)" class="w-full h-full object-cover" :alt="item.title" />
        <div
          class="absolute inset-0 bg-linear-to-t from-(--surface) via-(--surface)/20 to-transparent"
        ></div>

        <!-- Info Overlay -->
        <div class="absolute bottom-6 left-6 right-6">
          <span
            class="px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block shadow-lg"
            :class="config.badgeClass"
          >
            {{ config.badge }}
          </span>
          <h2
            class="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none drop-shadow-md"
          >
            {{ item.title }}
          </h2>
        </div>

        <!-- Close Button -->
        <button
          @click="handleClose"
          class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-20 border border-white/10 group"
        >
          <i class="pi pi-times text-xs group-hover:rotate-90 transition-transform"></i>
        </button>
      </div>

      <!-- BODY CONTENT -->
      <div class="p-6 md:p-10 space-y-8">
        <!-- Metadata Grid -->
        <div class="flex flex-wrap gap-3">
          <!-- Datos específicos de EVENTO -->
          <template v-if="type === 'event'">
            <div
              class="flex items-center gap-3 bg-(--surface-2)/50 px-5 py-2.5 rounded-2xl border border-(--border-color)/40 text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <i class="pi pi-calendar text-(--primary)"></i>
              <span>{{ item.date }}</span>
            </div>
            <div
              class="flex items-center gap-3 bg-(--surface-2)/50 px-5 py-2.5 rounded-2xl border border-(--border-color)/40 text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <i class="pi pi-clock text-(--primary)"></i>
              <span>{{ item.hour }}</span>
            </div>
            <div
              class="flex items-center gap-3 border-(--primary)/30 bg-(--primary)/5 px-5 py-2.5 rounded-2xl border text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <i class="pi pi-users text-(--primary)"></i>
              <span class="text-(--primary) font-black">{{ item.availablePlaces }}</span>
              <span class="text-[9px] opacity-60">PLAZAS</span>
            </div>
          </template>

          <!-- Datos específicos de JUEGO -->
          <template v-else>
            <div
              v-for="plat in item.platforms"
              :key="plat"
              class="flex items-center gap-3 bg-(--surface-2)/50 px-5 py-2.5 rounded-2xl border border-(--border-color)/40 text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <i class="pi pi-desktop text-(--primary)" v-if="plat.includes('PC')"></i>
              <i class="pi pi-mobile text-(--primary)" v-else-if="plat.includes('Móvil')"></i>
              <i class="pi pi-box text-(--primary)" v-else></i>
              <span>{{ plat }}</span>
            </div>
          </template>
        </div>

        <!-- Description Block -->
        <div class="relative">
          <h4
            class="text-[10px] font-black uppercase tracking-[0.3em] text-(--primary) mb-4 opacity-70"
          >
            {{ config.descriptionLabel }}
          </h4>
          <div class="relative pl-6 py-2">
            <div
              class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-(--primary) to-(--secondary) rounded-full shadow-[0_0_10px_rgba(255,139,0,0.5)]"
            ></div>
            <p class="text-(--text-main) leading-relaxed text-lg italic opacity-90">
              "{{ item.description }}"
            </p>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="pt-8 border-t border-(--border-color)/40 space-y-5">
          <template v-if="type === 'event'">
            <div
              class="flex items-center justify-between bg-(--surface-2)/40 p-5 rounded-2xl border border-(--border-color)/20 hover:bg-(--surface-2)/60 transition-colors"
            >
              <div class="flex items-center gap-4">
                <ToggleSwitch v-model="checked" />
                <div>
                  <p class="text-sm font-black uppercase tracking-tighter">Confirmar Inscripción</p>
                  <p class="text-[9px] text-(--text-muted) uppercase tracking-widest">
                    Acepto los términos y condiciones
                  </p>
                </div>
              </div>
            </div>
          </template>

          <button
            :disabled="type === 'event' && !checked"
            @click="$emit('action', item)"
            class="w-full py-5 rounded-2xl font-black uppercase italic tracking-tighter text-sm transition-all duration-300 shadow-xl"
            :class="[
              type === 'event' && !checked
                ? 'bg-(--surface-2) text-(--text-muted) opacity-40 cursor-not-allowed'
                : 'bg-(--primary) text-black hover:scale-[1.01] hover:brightness-110 active:scale-95',
            ]"
          >
            <span class="flex items-center justify-center gap-3">
              <i :class="[type === 'event' ? 'pi pi-check-circle' : 'pi pi-bolt']"></i>
              {{ config.actionLabel }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.animate-in {
  animation: enter 0.4s ease-out;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(12px) !important;
  background-color: rgba(0, 0, 0, 0.7) !important;
}

:deep(.p-dialog-content) {
  padding: 0 !important;
  background-color: transparent !important;
  overflow: visible !important;
}

:deep(.p-dialog-header) {
  display: none !important;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
