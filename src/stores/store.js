import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const tiposEventos = ref(['presentación', 'charla', 'taller'])
  const listaJuegos = ref([])
  const filtro = ref('')
  const paginasGames = ref(0)

  const listaEventos = ref([
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
  ])

  const cargarContador = async () => {
    const res = await fetch('http://localhost:8000/api/games/counter/total')
    const datos = await res.json()

    paginasGames.value = (datos.total % 9 === 0) ? datos.total / 9 : Math.floor(datos.total / 9) + 1;
  }

  const cargarJuegos = async (paginaActual = 1) => {
    // Definimos la URL dependiendo de si hay filtro o no
    const url =
      filtro.value === ''
        ? `http://localhost:8000/api/games/page/${paginaActual}`
        : `http://localhost:8000/api/games/name/${filtro.value}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`)
      }

      const datos = await response.json()

      listaJuegos.value = Array.isArray(datos) ? datos : []
    } catch (error) {
      console.error('Error al obtener los videojuegos:', error)
      listaJuegos.value = []
    }
  }
  return {
    tiposEventos,
    listaJuegos,
    filtro,
    listaEventos,
    paginasGames,
    cargarJuegos,
    cargarContador,
  }
})
