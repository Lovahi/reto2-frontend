import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const tiposEventos = ref(["presentación", "charla", "taller"]);
  const listaJuegos = ref([
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      genero: 'XXXXXXXX',
      descripcion: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
      plataformas: ["A, B, C"],
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'BBBBB',
      genero: 'XXXXXXXX',
      descripcion: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXYYYYYYYYYYYYYYYYYYYYYYYYYY',
      plataformas: ["A, B, C"],
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Boujad%2C_Platz.JPG/1280px-Boujad%2C_Platz.JPG',
      titulo: 'AAAAA',
      genero: 'XXXXXXXX',
      descripcion: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
      plataformas: ["A, B, C"],
    },
  ])
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
  /*   const cargarEventos = async () => {
    try {
      const response = await fetch('https://api.tusitio.com/eventos')
      const datos = await response.json()
      listaEventos.value = datos
    } catch (error) {
      console.error("Error cargando eventos:", error)
    }
  } */
  return { listaEventos, listaJuegos, tiposEventos }
})
