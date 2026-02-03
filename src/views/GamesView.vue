<script setup>
import { ref, onMounted, computed } from 'vue'
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
  store.cargarJuegos(page)
}

// --- MODAL LOGIC ---
const isDialogVisible = ref(false)

const openModal = async (clickedGame) => {
  isDialogVisible.value = true
  await store.cargarJuegoPorId(clickedGame.id)
}

const closeModal = () => {
  isDialogVisible.value = false
  store.videoJuegoActual = {}
}

const handleAction = (game) => {
  console.log('Inscribirse a eventos de:', game.title)
}

// --- HELPERS ---
const genres = computed(() => {
  const allGenres = store.listaJuegos.map((j) => j.genre)
  return [...new Set(allGenres)].filter(Boolean)
})

const getImageUrl = (juego) => {
  if (juego.image && juego.image !== '') {
    return `${import.meta.env.VITE_IMG_URL}/games/${juego.image}`
  }
  return `https://placehold.co/600x400/1a1d23/ff8b00?text=${encodeURIComponent(juego.title)}`
}

onMounted(() => {
  store.cargarJuegos()
  store.cargarContador()
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
      v-model="store.filtro"
      v-model:selectedType="store.filtroTipo"
      :types="genres"
      placeholder="Buscar videojuego..."
      @filter="store.cargarJuegos()"
    />

    <GridLayout :items="store.listaJuegos" :loading="store.loading" @item-click="openModal">
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
        <PaginatorComponent
          :first="first"
          :rows="rows"
          :totalRecords="store.totalGames"
          @page="onPage"
        />
      </template>
    </GridLayout>

    <!-- Dialogo Unificado -->
    <DialogComponent
      v-model:visible="isDialogVisible"
      type="game"
      :item="store.videoJuegoActual"
      :loading="store.loadingActual"
      @close="closeModal"
      @action="handleAction"
    />
  </div>
</template>
