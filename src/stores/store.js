import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const tiposEventos = ref(['presentación', 'charla', 'taller'])
  const listaJuegos = ref([])
  const filtro = ref('')
  const paginasGames = ref(0)
  const videoJuegoActual = ref({})
  const misInscripciones = ref([])
  const listaEventos = ref([
    {
      id: 1,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 2,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 3,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 4,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 5,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 6,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 7,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 8,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 9,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 10,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 11,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 12,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      fecha: '03-07-1995',
      hora: '19:30',
      plazas: 40,
    },
    {
      id: 13,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      fecha: '19-07-1996',
      hora: '19:50',
      plazas: 150,
    },
    {
      id: 14,
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
  const devolverVideoJuego = (titulo) => {
    console.log
    videoJuegoActual.value = listaJuegos.value.find(elemento => elemento.title === titulo);
    console.log(videoJuegoActual.value);
  }

  const estoyInscrito = (eventoId) => {
    return misInscripciones.value.includes(eventoId);
  }

  const cargarMisInscripciones = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/events`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        // El backend devuelve objetos, nosotros extraemos solo los IDs de los eventos
        // Transformamos [{user_id: 1, event_id: 5}, ...] en [5, ...]
        misInscripciones.value = data.map(item => item.event_id);
      }
    } catch (e) {
      console.error("Error cargando inscripciones", e);
    }
  }

  // --- 3. INSCRIBIRSE ---
  const inscribirse = async (eventoId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventoId}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.error || 'Error al inscribirse' };
      }

      // ÉXITO: Actualizamos la lista paralela y las plazas visuales
      if (!misInscripciones.value.includes(eventoId)) {
        misInscripciones.value.push(eventoId); // Añado el ID a mi lista
      }

      const evento = listaEventos.value.find(e => e.id === eventoId);
      if (evento) {
        evento.plazas--; // Resto plaza visualmente
      }

      return { success: true, message: data.message };

    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  }

  // --- 4. DESAPUNTARSE ---
  const desapuntarse = async (eventoId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventoId}/signup`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.error || 'Error al desapuntarse' };
      }

      // ÉXITO: Quitamos el ID de la lista paralela
      misInscripciones.value = misInscripciones.value.filter(id => id !== eventoId);

      const evento = listaEventos.value.find(e => e.id === eventoId);
      if (evento) {
        evento.plazas++; // Devuelvo la plaza visualmente
      }

      return { success: true, message: data.message };

    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  }
  return {
    tiposEventos,
    listaJuegos,
    filtro,
    listaEventos,
    paginasGames,
    videoJuegoActual,
    misInscripciones, // <--- EXPORTAR
    estoyInscrito,    // <--- EXPORTAR
    cargarMisInscripciones, // <--- EXPORTAR
    cargarJuegos,
    cargarContador,
    devolverVideoJuego,
    inscribirse,
    desapuntarse
  }



})
