<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { eventService } from '@/services/eventService'
import GridLayout from '@/layouts/GridLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import ToggleSwitch from 'primevue/toggleswitch'

// PrimeVue Components
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const authStore = useAuthStore()
const eventos = ref([])
const loading = ref(false)
const loadingActual = ref(false)
const eventoActual = ref({})
const isDialogVisible = ref(false)
const user = ref(authStore.user || {})
const router = useRouter()

const handleLogout = () => {
  authStore.clearAuth()
  router.push('/')
}

// Load Events
const cargarMisEventos = async () => {
  loading.value = true
  try {
    if (!authStore.user?.id) return
    const data = await eventService.getUserEvents(authStore.user.id)

    // Fetch details logic (same as before)
    const promises = data.map((e) => eventService.getEventById(e.event_id))
    const eventsDetails = await Promise.all(promises)
    eventos.value = eventsDetails
  } catch (error) {
    console.error('Error cargando mis eventos:', error)
  } finally {
    loading.value = false
  }
}

// Modal Logic
const openModal = async (clickedEvent) => {
  isDialogVisible.value = true
  loadingActual.value = true
  try {
    const res = await eventService.getEventById(clickedEvent.id)
    eventoActual.value = res
    eventoActual.value.isSignedUp = true // Since it's in "My Events", they are signed up
  } catch (error) {
    console.error('Error al cargar evento:', error)
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
    if (eventoActual.value.isSignedUp) {
      await eventService.cancelEvent(event.id)
    }
    closeModal()
    cargarMisEventos()
  } catch (error) {
    if (
      error.message?.includes('Duplicate entry') ||
      error.message?.includes('already exists') ||
      error.message?.includes('400')
    ) {
      // Ignore duplicate error in this context
    } else {
      console.error('Error:', error)
    }
  }
}

const getImageUrl = (evento) => {
  if (evento.image && evento.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/events/${evento.image}`
  }
  return `https://placehold.co/600x400/1a1d23/e10600?text=${encodeURIComponent(evento.title)}`
}

onMounted(() => {
  cargarMisEventos()
})
</script>

<template>
  <div class="container mx-auto p-4 md:p-10 pt-24 md:pt-40 text-(--text-main)">
    <!-- HEADER PROFILE -->
    <div
      class="flex flex-col md:flex-row items-center gap-8 mb-12 bg-(--surface) p-8 rounded-3xl border border-(--border-color) shadow-2xl"
    >
      <Avatar
        :image="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.email"
        class="w-24 h-24 md:w-32 md:h-32 border-4 border-(--primary) shadow-xl"
        shape="circle"
      />
      <div class="text-center md:text-left">
        <h1
          class="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-(--primary) mb-2"
        >
          {{ user.username }}
        </h1>
        <p class="text-(--text-muted) text-sm font-bold uppercase tracking-widest">
          {{ user.email }}
        </p>
        <p class="text-[10px] text-(--text-muted) opacity-60 mt-2">Miembro desde 2024</p>
      </div>
      <div class="md:ml-auto">
        <Button
          label="Cerrar Sesión"
          icon="pi pi-sign-out"
          severity="danger"
          variant="outlined"
          class="rounded-xl! font-black! uppercase! text-xs! tracking-widest! border-(--border-color)! text-(--text-muted)! hover:bg-red-500! hover:text-white! hover:border-red-500!"
          @click="handleLogout"
        />
      </div>
    </div>

    <!-- TABS -->
    <Tabs value="0">
      <TabList class="flex gap-4 mb-8 border-b border-(--border-color)">
        <Tab
          value="0"
          class="px-6 py-3 font-black uppercase text-sm tracking-widest hover:text-(--primary) cursor-pointer border-b-2 border-transparent ui-selected:border-(--primary) ui-selected:text-(--primary) transition-all"
          >Mis Eventos</Tab
        >
        <Tab
          value="1"
          class="px-6 py-3 font-black uppercase text-sm tracking-widest hover:text-(--primary) cursor-pointer border-b-2 border-transparent ui-selected:border-(--primary) ui-selected:text-(--primary) transition-all"
          >Perfil</Tab
        >
        <Tab
          value="2"
          class="px-6 py-3 font-black uppercase text-sm tracking-widest hover:text-(--primary) cursor-pointer border-b-2 border-transparent ui-selected:border-(--primary) ui-selected:text-(--primary) transition-all"
          >Configuración</Tab
        >
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div v-if="loading" class="flex justify-center p-10">
            <i class="pi pi-spin pi-spinner text-4xl text-(--primary)"></i>
          </div>

          <div
            v-else-if="eventos.length === 0"
            class="text-center py-20 bg-(--surface) rounded-3xl border border-(--border-color)"
          >
            <i class="pi pi-calendar-times text-6xl text-(--text-muted) mb-4"></i>
            <h2 class="text-2xl font-bold text-(--text-main) mb-2">
              No tienes eventos inscritos yet
            </h2>
            <RouterLink
              to="/events"
              class="inline-block mt-4 px-6 py-3 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-xl hover:scale-105 transition-transform"
            >
              Explorar Eventos
            </RouterLink>
          </div>

          <GridLayout v-else :items="eventos" :loading="loading" @item-click="openModal">
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
                    <i class="pi pi-calendar mr-1 text-(--primary) align-middle"></i>
                    {{ item.date }}
                  </div>
                </template>
              </CardComponent>
            </template>
          </GridLayout>
        </TabPanel>

        <TabPanel value="1">
          <div
            class="max-w-xl mx-auto bg-(--surface) p-8 rounded-3xl border border-(--border-color)"
          >
            <h3 class="text-xl font-black italic text-(--primary) mb-6 uppercase">Mis Datos</h3>
            <div class="space-y-4">
              <div>
                <label
                  class="block text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-2"
                  >Nombre de Usuario</label
                >
                <InputText
                  v-model="user.username"
                  class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) p-3 rounded-xl"
                />
              </div>
              <div>
                <label
                  class="block text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-2"
                  >Email</label
                >
                <InputText
                  v-model="user.email"
                  disabled
                  class="w-full bg-(--surface-2)/50 border border-(--border-color) text-(--text-muted) p-3 rounded-xl cursor-not-allowed"
                />
              </div>
              <Button
                label="Guardar Cambios"
                class="w-full mt-4 bg-(--primary) text-black font-black py-3 rounded-xl hover:bg-white transition-colors"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div class="max-w-xl mx-auto text-center py-10">
            <i class="pi pi-cog text-4xl text-(--text-muted) mb-4"></i>
            <p class="text-(--text-muted)">Configuración de cuenta próximamente...</p>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <DialogComponent
      v-model:visible="isDialogVisible"
      type="event"
      :item="eventoActual"
      :loading="loadingActual"
      @close="closeModal"
      @action="handleAction"
    >
      <template #footer="{ checked, updateChecked }">
        <button
          :disabled="!checked"
          @click="handleAction(eventoActual)"
          class="w-full py-5 rounded-2xl font-black uppercase italic tracking-tighter text-sm transition-all duration-300 shadow-xl bg-red-500 text-white hover:bg-red-600 mt-5"
        >
          <span class="flex items-center justify-center gap-3">
            <i class="pi pi-times-circle"></i>
            Cancelar Inscripción
          </span>
        </button>
        <div class="flex items-center justify-center gap-2 mt-4">
          <ToggleSwitch :modelValue="checked" @update:modelValue="updateChecked" />
          <span class="text-xs uppercase font-bold text-(--text-muted)">Confirmar cancelación</span>
        </div>
      </template>
    </DialogComponent>
  </div>
</template>

<style scoped>
:deep(.p-tablist-tab-list) {
  background: transparent;
  border: none;
}
</style>
