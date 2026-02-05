<script setup>
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
  const isSignedUp = props.item?.isSignedUp
  return {
    badge: props.item?.type || 'Evento',
    badgeClass: 'bg-(--secondary)',
    imageFolder: 'events',
    actionLabel: isSignedUp ? 'Cancelar Inscripción' : 'Confirmar Inscripción',
    descriptionLabel: 'Detalles del evento',
    accentColor: 'var(--secondary)',
    isSignedUp,
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
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="handleClose"></div>

        <!-- Modal Container -->
        <div
          class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar outline-none"
        >
          <!-- Estado de Carga -->
          <div
            v-if="loading"
            class="w-full h-96 flex flex-col items-center justify-center bg-(--surface) rounded-3xl border border-(--border-color)/50 shadow-2xl"
          >
            <i class="pi pi-spin pi-spinner text-5xl text-(--primary) mb-4"></i>
            <p class="text-xs font-black uppercase tracking-widest text-(--text-muted)">
              Sincronizando con la API...
            </p>
          </div>

          <!-- Contenido Principal -->
          <div
            v-else-if="item && item.id"
            class="flex flex-col bg-(--surface) text-(--text-main) rounded-3xl overflow-hidden border border-(--border-color)/50 shadow-2xl transition-all duration-300"
          >
            <!-- HERO SECTION -->
            <div class="relative h-64 md:h-80 overflow-hidden shrink-0">
              <img :src="getImageUrl(item)" class="w-full h-full object-cover" :alt="item.title" />
              <div class="absolute inset-0 bg-black/40"></div>

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
            <div class="p-6 md:p-10 space-y-8 overflow-y-auto">
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
                    class="absolute left-0 top-0 bottom-0 w-1 bg-(--primary) rounded-full shadow-[0_0_10px_rgba(255,139,0,0.3)]"
                  ></div>
                  <p class="text-(--text-main) leading-relaxed text-lg italic opacity-90">
                    "{{ item.description }}"
                  </p>
                </div>
              </div>

              <!-- Action Footer (Conditional Slot) -->
              <div v-if="$slots.footer" class="pt-8 border-t border-(--border-color)/40 space-y-5">
                <slot
                  name="footer"
                  :checked="checked"
                  :updateChecked="(val) => (checked = val)"
                ></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .relative {
  transform: scale(0.9) translateY(20px);
}

.modal-fade-enter-to .relative {
  transform: scale(1) translateY(0);
}

.modal-fade-leave-from .relative {
  transform: scale(1) translateY(0);
}

.modal-fade-leave-to .relative {
  transform: scale(0.9) translateY(20px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
