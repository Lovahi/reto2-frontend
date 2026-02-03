<script setup>
import { watch } from 'vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Checkbox from 'primevue/checkbox'

const props = defineProps({
  modelValue: String,
  selectedType: [String, Object],
  types: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Buscar por título...',
  },
  showDate: {
    type: Boolean,
    default: false,
  },
  dateModel: [Date, String],
  showAvailable: {
    type: Boolean,
    default: false,
  },
  availableModel: Boolean,
})

const emit = defineEmits([
  'update:modelValue',
  'update:selectedType',
  'update:dateModel',
  'update:availableModel',
  'filter',
])

// Auto-filtrado al cambiar cualquier valor
watch(
  () => [props.modelValue, props.selectedType, props.dateModel, props.availableModel],
  () => {
    emit('filter')
  },
)
</script>

<template>
  <div
    class="relative flex flex-col lg:flex-row gap-5 mb-12 items-stretch lg:items-center bg-(--surface)/40 backdrop-blur-xl p-2 rounded-3xl border border-(--border-color)/30 shadow-2xl"
  >
    <!-- Buscador Principal con diseño más integrado -->
    <div class="flex-1 flex items-center min-h-[60px] px-4 group">
      <i
        class="pi pi-search text-(--text-muted) group-focus-within:text-(--primary) transition-colors mr-4"
      ></i>
      <InputText
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="flex-1 bg-transparent! border-none! shadow-none! p-0! text-base! font-medium! text-(--text-main)! placeholder:text-(--text-muted)/50"
      />
    </div>

    <!-- Divisores visuales solo en desktop -->
    <div class="hidden lg:block w-px h-8 bg-(--border-color)/20"></div>

    <!-- Contenedor de filtros secundarios -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-2 lg:p-0">
      <!-- Filtro de Tipo con diseño minimalista -->
      <div v-if="types.length > 0" class="relative min-w-[180px]">
        <Select
          :modelValue="selectedType"
          @update:modelValue="$emit('update:selectedType', $event)"
          :options="['Todos', ...types]"
          placeholder="Categoría"
          class="w-full! bg-(--surface-2)/50! border-(--border-color)/30! rounded-2xl! transition-all hover:bg-(--surface-2)!"
        />
      </div>

      <!-- Filtro de Fecha -->
      <div v-if="showDate" class="relative min-w-[160px]">
        <DatePicker
          :modelValue="dateModel"
          @update:modelValue="$emit('update:dateModel', $event)"
          placeholder="Calendario"
          class="w-full! bg-(--surface-2)/50! border-(--border-color)/30! rounded-2xl! transition-all hover:bg-(--surface-2)!"
          dateFormat="yy-mm-dd"
          showIcon
          iconDisplay="input"
        />
      </div>

      <!-- Toggle de Disponibilidad con diseño de 'píldora' -->
      <div
        v-if="showAvailable"
        @click="$emit('update:availableModel', !availableModel)"
        :class="[
          'flex items-center gap-3 px-6 h-12 rounded-2xl border transition-all cursor-pointer select-none',
          availableModel
            ? 'bg-(--primary)/20 border-(--primary)/50 text-(--primary)'
            : 'bg-(--surface-2)/50 border-(--border-color)/30 text-(--text-muted) hover:bg-(--surface-2)',
        ]"
      >
        <Checkbox :modelValue="availableModel" :binary="true" class="w-4! h-4!" />
        <span class="text-[10px] font-black uppercase tracking-widest">Plazas Libres</span>
      </div>
    </div>

    <!-- Indicador de filtrado activo (subrayado naranja sutil) -->
    <div
      class="absolute bottom-0 left-6 right-6 h-[2px] bg-linear-to-r from-transparent via-(--primary)/30 to-transparent opacity-50"
    ></div>
  </div>
</template>

<style scoped>
/* Reset de estilos pesados de PrimeVue para un look más "Apple/Moderno" */
:deep(.p-select),
:deep(.p-datepicker) {
  box-shadow: none !important;
}

:deep(.p-select-label),
:deep(.p-datepicker-input) {
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  padding: 0.75rem 1.25rem !important;
  color: var(--text-main) !important;
}

:deep(.p-select-overlay) {
  background: var(--surface) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 1.25rem !important;
  margin-top: 0.5rem !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px) !important;
}

:deep(.p-select-option) {
  padding: 0.75rem 1rem !important;
  margin: 0.25rem !important;
  border-radius: 0.75rem !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  transition: all 0.2s ease !important;
}

:deep(.p-select-option:hover) {
  background: color-mix(in srgb, var(--primary), transparent 90%) !important;
  color: var(--primary) !important;
}

:deep(.p-select-option.p-highlight) {
  background: var(--primary) !important;
  color: black !important;
}

/* Animación de foco para el buscador */
input::placeholder {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

input:focus::placeholder {
  transform: translateX(10px);
  opacity: 0.3;
}
</style>
