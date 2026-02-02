<script setup>
import { useStore } from '@/stores/store'
import { ref, onMounted } from 'vue' // <--- Necesario onMounted
import TarjetaEvento from '@/components/Eventos/TarjetaEvento.vue'
import DialogoEvento from '@/components/Eventos/DialogoEvento.vue'

const store = useStore()
const eventoSeleccionado = ref(null);

// 1. CARGAR DATOS AL ENTRAR
onMounted(async () => {
  // Usamos ID 1 para probar en clase. 
  // Si tienes login real, aquí iría el ID del usuario logueado.
  await store.cargarMisInscripciones(1);
  await store.cargarEventos();
  await store.cargarContadorEventos();
});

const abrirElModal = (eventoClickado) => {
  eventoSeleccionado.value = eventoClickado;
};
const cerrarElModal = () => {
  eventoSeleccionado.value = null;
};

// 2. FUNCIÓN PARA INSCRIBIRSE
const manejarInscripcion = async () => {
  const res = await store.inscribirse(eventoSeleccionado.value.id);
  if (res.success) {
    alert("¡Te has apuntado correctamente!");
  } else {
    alert("Error: " + res.message);
  }
};

// 3. FUNCIÓN PARA DESAPUNTARSE
const manejarDesapunte = async () => {
  if (!confirm("¿Seguro que quieres borrarte?")) return;

  const res = await store.desapuntarse(eventoSeleccionado.value.id);
  if (res.success) {
    alert("Te has desapuntado.");
  } else {
    alert("Error: " + res.message);
  }
};
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-5 py-4">
    <select name="" id="" class="border-2 border-green-400 rounded-lg">
      <option value="">--seleccione un tipo--</option>
      <option value="" v-for="(tipo, index) in store.tiposEventos" :key="index">
        {{ tipo }}
      </option>
    </select>
    <input type="date" class="border-2 border-green-400 rounded-lg px-2" />
    <div>
      <input type="checkbox" id="checkPlazas" /><label for="checkPlazas">Mostrar solo con plazas libres</label>
    </div>
  </div>

  <tarjeta-evento @abrirModal="abrirElModal" />

  <DialogoEvento v-if="eventoSeleccionado" :evento="eventoSeleccionado" @cerrar="cerrarElModal"
    @inscribirse="manejarInscripcion" @desapuntarse="manejarDesapunte" />
</template>

<style scoped></style>