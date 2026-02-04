<script setup>
import { ref, onMounted, computed } from 'vue'
import { gameService } from '@/services/gameService'
import GridLayout from '@/layouts/GridLayout.vue'
import CardComponent from '@/components/CardComponent.vue'
import PaginatorComponent from '@/components/PaginatorComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'

// --- STATE ---
const listaJuegos = ref([])
const loading = ref(false)
const loadingActual = ref(false)
const videoJuegoActual = ref({})
const totalGames = ref(0)

// Filters
const filtro = ref('')
const filtroTipo = ref('Todos')

// --- PAGINATION ---
const first = ref(0)
const rows = ref(9)

const cargarContador = async () => {
  try {
    const resGames = await gameService.getGamesCounter()
    totalGames.value = resGames?.total || 0
  } catch (error) {
    console.error('Error al cargar contadores:', error)
  }
}

const cargarJuegos = async (page = 1) => {
  loading.value = true
  try {
    let datos = await gameService.getAllGames(page)

    if (filtro.value) {
      datos = datos.filter((j) => j.title.toLowerCase().includes(filtro.value.toLowerCase()))
    }

    if (filtroTipo.value && filtroTipo.value !== 'Todos') {
      datos = datos.filter((j) => j.genre === filtroTipo.value)
    }

    listaJuegos.value = Array.isArray(datos) ? datos : []
  } catch (error) {
    console.error('Error al obtener los videojuegos:', error)
    listaJuegos.value = []
  } finally {
    loading.value = false
  }
}

const onPage = (event) => {
  first.value = event.first
  const page = event.page + 1
  cargarJuegos(page)
}

// --- MODAL LOGIC ---
const isDialogVisible = ref(false)

const openModal = async (clickedGame) => {
  isDialogVisible.value = true
  loadingActual.value = true
  try {
    const res = await gameService.getGameById(clickedGame.id)
    videoJuegoActual.value = res
  } catch (error) {
    console.error(`Error al cargar el juego ${clickedGame.id}:`, error)
    videoJuegoActual.value = {}
  } finally {
    loadingActual.value = false
  }
}

const closeModal = () => {
  isDialogVisible.value = false
  videoJuegoActual.value = {}
}

const handleAction = (game) => {
  console.log('Inscribirse a eventos de:', game.title)
}

// --- HELPERS ---
const genres = computed(() => {
  const allGenres = listaJuegos.value.map((j) => j.genre)
  return [...new Set(allGenres)].filter(Boolean)
})

const getImageUrl = (juego) => {
  if (juego.image && juego.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/games/${juego.image}`
  }
  return `https://placehold.co/600x400/1a1d23/ff8b00?text=${encodeURIComponent(juego.title)}`
}

onMounted(() => {
  cargarJuegos()
  cargarContador()
})
</script>

<template>
  <div class="container mx-auto p-4 md:p-10 pt-24 text-(--text-main)">
    <h1
      class="text-4xl font-black italic text-(--primary) mb-8 uppercase tracking-tighter text-center"
    >
      Juegos
    </h1>

    <FilterComponent
      v-model="filtro"
      v-model:selectedType="filtroTipo"
      :types="genres"
      placeholder="Buscar videojuego..."
      @filter="cargarJuegos()"
    />

    <GridLayout :items="listaJuegos" :loading="loading" @item-click="openModal">
      <template #item="{ item }">
        <CardComponent
          :title="item.title"
          :badge="item.genre"
          :image="getImageUrl(item)"
          :description="item.description"
        >
          <template #footer-extra>
            <div
              v-for="plat in item.platforms"
              :key="plat"
              class="px-2 py-0.5 bg-black/20 text-[10px] text-(--primary) border border-(--border-color) rounded uppercase font-bold"
            >
              {{ plat }}
            </div>
          </template>
        </CardComponent>
      </template>

      <template #pagination>
        <PaginatorComponent :first="first" :rows="rows" :totalRecords="totalGames" @page="onPage" />
      </template>
    </GridLayout>

    <!-- Dialogo Unificado -->
    <DialogComponent
      v-model:visible="isDialogVisible"
      type="game"
      :item="videoJuegoActual"
      :loading="loadingActual"
      @close="closeModal"
      @action="handleAction"
    />
  </div>
</template>
