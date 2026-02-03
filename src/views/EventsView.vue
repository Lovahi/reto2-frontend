<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import GridLayout from '@/layouts/GridLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import PaginatorComponent from '@/components/PaginatorComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'

const store = useStore()

// --- PAGINATION ---
const first = ref(0)
const rows = ref(9)

const onPage = (event) => {
  first.value = event.first
  const page = event.page + 1
  store.cargarEventos(page)
}

// --- MODAL LOGIC ---
const isDialogVisible = ref(false)

const openModal = async (clickedEvent) => {
  isDialogVisible.value = true
  await store.cargarEventoPorId(clickedEvent.id)
}

const closeModal = () => {
  isDialogVisible.value = false
  store.eventoActual = {}
}

const handleAction = (event) => {
  console.log('Inscribiéndose al evento:', event.id, event.title)
  store.inscribirseEvento(event.id)
}

// --- HELPERS ---
const getImageUrl = (evento) => {
  if (evento.image && evento.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/events/${evento.image}`
  }
  return `https://placehold.co/600x400/1a1d23/e10600?text=${encodeURIComponent(evento.title)}`
}

onMounted(() => {
  store.cargarEventos()
  store.cargarContador()
})
</script>

<template>
  <div class="container mx-auto p-4 md:p-10 pt-24 text-(--text-main)">
    <h1
      class="text-4xl font-black italic text-(--primary) mb-8 uppercase tracking-tighter text-center"
    >
      Eventos Pro
    </h1>

    <!-- Nuevo Filtro Genérico -->
    <FilterComponent
      v-model="store.filtro"
      v-model:selectedType="store.filtroTipo"
      :types="store.tiposEventos"
      placeholder="Buscar evento por título..."
      :showDate="true"
      v-model:dateModel="store.filtroFecha"
      :showAvailable="true"
      v-model:availableModel="store.filtroPlazas"
      @filter="store.cargarEventos()"
    />

    <GridLayout :items="store.listaEventos" :loading="store.loading" @item-click="openModal">
      <template #item="{ item }">
        <CardComponent
          :title="item.title"
          :badge="item.type"
          :image="getImageUrl(item)"
          :description="item.description"
        >
          <template #footer-extra>
            <div
              class="px-2 py-0.5 bg-black/20 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
            >
              <i class="pi pi-calendar mr-1 text-(--primary) align-middle"></i> {{ item.date }}
            </div>
            <div
              class="px-2 py-0.5 bg-black/20 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
            >
              <i class="pi pi-clock mr-1 text-(--primary) align-middle"></i> {{ item.hour }}
            </div>
            <div
              class="px-2 py-0.5 bg-black/20 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
            >
              <i class="pi pi-users mr-1 text-(--primary) align-middle"></i>
              {{ item.availablePlaces }}
            </div>
          </template>
        </CardComponent>
      </template>

      <template #pagination>
        <PaginatorComponent
          :first="first"
          :rows="rows"
          :totalRecords="store.totalEvents"
          @page="onPage"
        />
      </template>
    </GridLayout>

    <!-- Dialogo Unificado -->
    <DialogComponent
      v-model:visible="isDialogVisible"
      type="event"
      :item="store.eventoActual"
      :loading="store.loadingActual"
      @close="closeModal"
      @action="handleAction"
    />
  </div>
</template>
