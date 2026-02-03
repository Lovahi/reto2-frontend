<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: String,
  totalRecords: Number,
  first: Number,
  rows: {
    type: Number,
    default: 9,
  },
})

defineEmits(['page-change', 'item-click'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
    <!-- Slot para renderizar cada tarjeta -->
    <template v-for="(item, index) in items" :key="item.id || index">
      <div @click="$emit('item-click', item)" class="cursor-pointer h-full">
        <slot name="item" :item="item"></slot>
      </div>
    </template>
  </div>

  <!-- Estado de carga -->
  <div
    v-if="loading"
    class="flex flex-col items-center justify-center py-20 opacity-50 text-(--text-main)"
  >
    <i class="pi pi-spin pi-spinner text-4xl text-(--primary) mb-4"></i>
    <p class="uppercase tracking-widest text-xs font-bold">Cargando...</p>
  </div>

  <!-- Estado vacío -->
  <div
    v-if="!loading && items.length === 0"
    class="flex flex-col items-center justify-center py-20 opacity-50 text-(--text-main)"
  >
    <p class="uppercase tracking-widest text-xs font-bold text-center">
      No se encontraron resultados
    </p>
  </div>

  <!-- Paginador -->
  <slot name="pagination"></slot>
</template>

<style scoped>
/* Transición suave para el grid */
.grid > div {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
