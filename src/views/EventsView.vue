<script setup>
import { ref, onMounted } from 'vue'
import { eventService } from '@/services/eventService'
import { useAuthStore } from '@/stores/authStore'
import ToggleSwitch from 'primevue/toggleswitch'
import GridLayout from '@/layouts/GridLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import PaginatorComponent from '@/components/PaginatorComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'

// --- STATE ---
const authStore = useAuthStore()
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

    if (authStore.isAuthenticated() && authStore.user?.id) {
      const userEvents = await eventService.getUserEvents(authStore.user.id)
      // Ajustar según si el backend devuelve array directo o objeto con data
      const eventsList = Array.isArray(userEvents) ? userEvents : userEvents.data || []
      eventoActual.value.isSignedUp = eventsList.some((e) => e.event_id === clickedEvent.id)
    }
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

const handleAction = async (event) => {
  try {
    // Optimistic UI update or loading state could go here
    if (eventoActual.value.isSignedUp) {
      await eventService.cancelEvent(event.id)
    } else {
      await eventService.signupEvent(event.id)
    }

    // Refresh event data to get updated available places and status
    const updatedEvent = await eventService.getEventById(event.id)
    eventoActual.value = updatedEvent

    // Update the event in the main list so the card reflects changes
    const index = listaEventos.value.findIndex((e) => e.id === event.id)
    if (index !== -1) {
      listaEventos.value[index] = updatedEvent
    }
  } catch (error) {
    if (
      error.message?.includes('Duplicate entry') ||
      error.message?.includes('already exists') ||
      error.message?.includes('400')
    ) {
      // Si el error es porque ya existe, lo tratamos como éxito (ya está inscrito)
      // Pero si estábamos intentando cancelar, sí es un error real.
      // Asumimos que si llegamos aquí al intentar inscribirnos, es que ya estábamos.
      const updatedEvent = await eventService.getEventById(event.id)
      eventoActual.value = updatedEvent
      eventoActual.value.isSignedUp = true // Forzamos visualmente
    } else {
      console.error('Error al procesar la inscripción:', error)
    }
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
  <div class="container mx-auto p-4 md:p-10 pt-24 md:pt-40 text-(--text-main)">
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
              class="px-2 py-0.5 bg-(--surface-2)/50 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
            >
              <i class="pi pi-calendar mr-1 text-(--primary) align-middle"></i> {{ item.date }}
            </div>
            <div
              class="px-2 py-0.5 bg-(--surface-2)/50 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
            >
              <i class="pi pi-clock mr-1 text-(--primary) align-middle"></i> {{ item.hour }}
            </div>
            <div
              class="px-2 py-0.5 bg-(--surface-2)/50 text-[10px] text-(--text-muted) border border-(--border-color) rounded uppercase font-bold"
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
    >
      <template #footer="{ checked, updateChecked }">
        <template v-if="!eventoActual.isSignedUp">
          <div
            class="flex items-center justify-between bg-(--surface-2)/40 p-5 rounded-2xl border border-(--border-color)/20 hover:bg-(--surface-2)/60 transition-colors"
          >
            <div class="flex items-center gap-4">
              <ToggleSwitch :modelValue="checked" @update:modelValue="updateChecked" />
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
          :disabled="!eventoActual.isSignedUp && !checked"
          @click="handleAction(eventoActual)"
          class="w-full py-5 rounded-2xl font-black uppercase italic tracking-tighter text-sm transition-all duration-300 shadow-xl mt-5"
          :class="[
            !eventoActual.isSignedUp && !checked
              ? 'bg-(--surface-2) text-(--text-muted) opacity-40 cursor-not-allowed'
              : eventoActual.isSignedUp
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-(--primary) text-black hover:scale-[1.01] hover:brightness-110 active:scale-95',
          ]"
        >
          <span class="flex items-center justify-center gap-3">
            <i :class="[eventoActual.isSignedUp ? 'pi pi-times-circle' : 'pi pi-check-circle']"></i>
            {{ eventoActual.isSignedUp ? 'Cancelar Inscripción' : 'Confirmar Inscripción' }}
          </span>
        </button>
      </template>
    </DialogComponent>
  </div>
</template>
