<script setup>
import { ref, onMounted } from 'vue'
import { eventService } from '@/services/eventService'
import GridLayout from '@/layouts/GridLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import PaginatorComponent from '@/components/PaginatorComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'

// --- STATE ---
const listaEventos = ref([])
const tiposEventos = ref(['presentación', 'charla', 'taller'])
const loading = ref(false)
const loadingActual = ref(false)
const eventoActual = ref({})
const totalEvents = ref(0)

// Filters
const filtro = ref('')
const filtroTipo = ref('Todos')
const filtroFecha = ref(null)
const filtroPlazas = ref(false)

// --- PAGINATION ---
const first = ref(0)
const rows = ref(9)

const cargarContador = async () => {
  try {
    const resEvents = await eventService.getEventsCounter()
    totalEvents.value = resEvents?.total || 0
  } catch (error) {
    console.error('Error al cargar contadores:', error)
  }
}

const cargarEventos = async (page = 1) => {
  loading.value = true
  try {
    let datos = await eventService.getEvents(page)

    if (filtro.value) {
      datos = datos.filter((e) => e.title.toLowerCase().includes(filtro.value.toLowerCase()))
    }

    if (filtroTipo.value && filtroTipo.value !== 'Todos') {
      datos = datos.filter((e) => e.type === filtroTipo.value)
    }

    if (filtroPlazas.value) {
      datos = datos.filter((e) => e.availablePlaces > 0)
    }

    if (filtroFecha.value) {
      const selectedDate = new Date(filtroFecha.value).toISOString().split('T')[0]
      datos = datos.filter((e) => e.date === selectedDate)
    }

    listaEventos.value = Array.isArray(datos) ? datos : []
  } catch (error) {
    console.error('Error al cargar eventos:', error)
    listaEventos.value = []
  } finally {
    loading.value = false
  }
}

const onPage = (event) => {
  first.value = event.first
  const page = event.page + 1
  cargarEventos(page)
}

// --- MODAL LOGIC ---
const isDialogVisible = ref(false)

const openModal = async (clickedEvent) => {
  isDialogVisible.value = true
  loadingActual.value = true
  try {
    const res = await eventService.getEventById(clickedEvent.id)
    eventoActual.value = res
  } catch (error) {
    console.error(`Error al cargar el evento ${clickedEvent.id}:`, error)
    eventoActual.value = {}
  } finally {
    loadingActual.value = false
  }
}

const closeModal = () => {
  isDialogVisible.value = false
  eventoActual.value = {}
}

const handleAction = (event) => {
  if (eventoActual.value.isSignedUp) {
    eventService.cancelEvent(event.id)
  } else {
    eventService.signupEvent(event.id)
  }
}

// --- HELPERS ---
const getImageUrl = (evento) => {
  if (evento.image && evento.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/events/${evento.image}`
  }
  return `https://placehold.co/600x400/1a1d23/e10600?text=${encodeURIComponent(evento.title)}`
}

onMounted(() => {
  cargarEventos()
  cargarContador()
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
      v-model="filtro"
      v-model:selectedType="filtroTipo"
      :types="tiposEventos"
      placeholder="Buscar evento por título..."
      :showDate="true"
      v-model:dateModel="filtroFecha"
      :showAvailable="true"
      v-model:availableModel="filtroPlazas"
      @filter="cargarEventos()"
    />

    <GridLayout :items="listaEventos" :loading="loading" @item-click="openModal">
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
          :totalRecords="totalEvents"
          @page="onPage"
        />
      </template>
    </GridLayout>

    <!-- Dialogo Unificado -->
    <DialogComponent
      v-model:visible="isDialogVisible"
      type="event"
      :item="eventoActual"
      :loading="loadingActual"
      @close="closeModal"
      @action="handleAction"
    />
  </div>
</template>
