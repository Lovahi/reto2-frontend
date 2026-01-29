<script setup>
import { useStore } from '@/stores/store'
import { ref } from 'vue'
import TarjetaEvento from '@/components/Eventos/TarjetaEvento.vue'
import DialogoEvento from '@/components/Eventos/DialogoEvento.vue'
const store = useStore()

const eventoSeleccionado = ref(null);
const abrirElModal = (eventoClickado) => {
  eventoSeleccionado.value = eventoClickado;
};
const cerrarElModal = () => {
  eventoSeleccionado.value = null;
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
  <DialogoEvento v-if="eventoSeleccionado" :evento="eventoSeleccionado" @cerrar="cerrarElModal" />
</template>
<style scoped></style>
