<script setup>
import Paginator from 'primevue/paginator'

defineProps({
  totalRecords: {
    type: Number,
    default: 0,
  },
  rows: {
    type: Number,
    default: 9,
  },
  first: {
    type: Number,
    default: 0,
  },
})

defineEmits(['page'])
</script>

<template>
  <div class="mt-12 flex justify-center">
    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      @page="$emit('page', $event)"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      class="bg-transparent border-none text-(--text-main)"
    />
  </div>
</template>

<style scoped>
:deep(.p-paginator) {
  background: transparent;
}
:deep(.p-paginator-page),
:deep(.p-paginator-first),
:deep(.p-paginator-prev),
:deep(.p-paginator-next),
:deep(.p-paginator-last) {
  background: transparent;
  color: var(--text-main);
  border: 2px solid var(--border-color);
  margin: 0 0.25rem;
  border-radius: 0.5rem;
  font-weight: 900;
  transition: all 0.2s;
}
:deep(.p-paginator-page:hover),
:deep(.p-paginator-page.p-highlight) {
  background: var(--primary) !important;
  color: black !important;
  border-color: var(--primary);
}
:deep(.p-paginator-page.p-highlight) {
  box-shadow: 0 0 15px rgba(255, 139, 0, 0.3);
}
</style>
