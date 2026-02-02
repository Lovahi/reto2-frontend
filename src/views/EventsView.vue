<script setup>
import { useStore } from '@/stores/store'
import { ref } from 'vue'
import EventCard from '@/components/Eventos/TarjetaEvento.vue'
import EventDialog from '@/components/Eventos/DialogoEvento.vue'
const store = useStore()

const selectedEvent = ref(null)
const openModal = (clickedEvent) => {
  selectedEvent.value = clickedEvent
}
const closeModal = () => {
  selectedEvent.value = null
}
</script>
<template>
  <div class="container mx-auto p-4 md:p-10 pt-24">
    <h1 class="text-4xl font-black italic text-[var(--primary)] mb-8 uppercase tracking-tighter">
      Eventos Pro
    </h1>

    <div
      class="flex flex-col sm:flex-row gap-5 mb-10 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border-color)] items-center"
    >
      <div class="flex flex-col gap-2 w-full sm:w-auto">
        <label class="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]"
          >Tipo de Evento</label
        >
        <select
          class="bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-main)] rounded-lg px-4 py-2 outline-none focus:border-[var(--primary)] transition-colors"
        >
          <option value="">Todos los tipos</option>
          <option v-for="(tipo, index) in store.tiposEventos" :key="index" :value="tipo">
            {{ tipo }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-2 w-full sm:w-auto">
        <label class="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]"
          >Fecha</label
        >
        <input
          type="date"
          class="bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-main)] rounded-lg px-4 py-2 outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      <div class="flex items-center gap-3 mt-auto mb-1 text-[var(--text-main)]">
        <input type="checkbox" id="checkPlazas" class="w-5 h-5 accent-[var(--primary)]" />
        <label for="checkPlazas" class="text-sm font-medium">Solo con plazas libres</label>
      </div>
    </div>

    <EventCard @abrirModal="openModal" />
    <EventDialog v-if="selectedEvent" :evento="selectedEvent" @cerrar="closeModal" />
  </div>
</template>
<style scoped></style>
