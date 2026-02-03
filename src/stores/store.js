import { ref } from 'vue'
import { defineStore } from 'pinia'
import { gameService } from '@/services/gameService'
import { eventService } from '@/services/eventService'

export const useStore = defineStore('store', () => {
  // --- STATE ---
  const tiposEventos = ref(['presentación', 'charla', 'taller'])
  const listaJuegos = ref([])
  const listaEventos = ref([])
  const filtro = ref('')
  const filtroTipo = ref('Todos')
  const filtroFecha = ref(null)
  const filtroPlazas = ref(false)
  const paginasGames = ref(0)
  const totalGames = ref(0)
  const paginasEventos = ref(0)
  const totalEvents = ref(0)
  const videoJuegoActual = ref({})
  const eventoActual = ref({})
  const loading = ref(false)
  const loadingActual = ref(false)

  // --- ACTIONS ---

  /**
   * Calcula el número de páginas necesarias para los juegos y eventos
   */
  const cargarContador = async () => {
    try {
      // Contador Juegos
      const resGames = await gameService.getGamesCounter()
      paginasGames.value = resGames?.pages || 1
      totalGames.value = resGames?.total || 0

      // Contador Eventos
      const resEvents = await eventService.getEventsCounter()
      paginasEventos.value = resEvents?.pages || 1
      totalEvents.value = resEvents?.total || 0
    } catch (error) {
      console.error('Error al cargar contadores:', error)
      if (!paginasGames.value) paginasGames.value = 1
      if (!paginasEventos.value) paginasEventos.value = 1
    }
  }

  /**
   * Carga la lista de videojuegos desde la API
   */
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

  /**
   * Carga la lista de eventos desde la API
   */
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

      // La fecha se asume en formato YYYY-MM-DD del input/datepicker
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

  /**
   * Carga un videojuego por ID directamente desde la API
   */
  const cargarJuegoPorId = async (id) => {
    loadingActual.value = true
    try {
      const res = await gameService.getGameById(id)
      videoJuegoActual.value = res
      return res
    } catch (error) {
      console.error(`Error al cargar el juego ${id}:`, error)
      videoJuegoActual.value = {}
    } finally {
      loadingActual.value = false
    }
  }

  /**
   * Carga un evento por ID directamente desde la API
   */
  const cargarEventoPorId = async (id) => {
    loadingActual.value = true
    try {
      const res = await eventService.getEventById(id)
      eventoActual.value = res
      return res
    } catch (error) {
      console.error(`Error al cargar el evento ${id}:`, error)
      eventoActual.value = {}
    } finally {
      loadingActual.value = false
    }
  }

  /**
   * Busca un videojuego por título en la lista local y lo marca como actual
   */
  const devolverVideoJuego = (titulo) => {
    const juego = listaJuegos.value.find((elemento) => elemento.title === titulo)
    if (juego) {
      videoJuegoActual.value = juego
    }
  }

  return {
    // State
    tiposEventos,
    listaJuegos,
    filtro,
    filtroTipo,
    filtroFecha,
    filtroPlazas,
    listaEventos,
    paginasGames,
    totalGames,
    paginasEventos,
    totalEvents,
    videoJuegoActual,
    eventoActual,
    loading,
    loadingActual,
    // Actions
    cargarJuegos,
    cargarContador,
    cargarEventos,
    cargarJuegoPorId,
    cargarEventoPorId,
    devolverVideoJuego,
  }
})
