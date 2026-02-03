<script setup>
import Card from 'primevue/card'

defineProps({
  title: String,
  badge: String,
  image: String,
  description: String,
  loading: Boolean,
})
</script>

<template>
  <Card
    class="group overflow-hidden bg-(--surface) border border-(--border-color)/40 rounded-xl transition-all duration-300 hover:border-(--primary)/50 hover:shadow-[0_4_12px_rgba(0,0,0,0.2),0_0_10px_rgba(255,139,0,0.1)] w-400px h-full flex flex-col"
  >
    <template #header>
      <div class="relative overflow-hidden aspect-video">
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-(--surface) via-transparent to-transparent opacity-40"
        ></div>

        <!-- Slot para badges flotantes -->
        <div class="absolute bottom-1 flex flex-wrap p-3 gap-1.5 justify-end">
          <span
            v-if="badge"
            class="px-2 py-0.5 bg-(--surface-2)/90 backdrop-blur-xs text-(--primary) text-[9px] font-black uppercase tracking-widest rounded border border-(--border-color)/30 shadow-lg"
          >
            {{ badge }}
          </span>
          <slot name="image-overlay"></slot>
        </div>
      </div>
    </template>

    <template #title>
      <h3
        class="text-base font-black italic uppercase tracking-tighter text-(--text-main) group-hover:text-(--primary) transition-colors line-clamp-1"
      >
        {{ title }}
      </h3>
    </template>

    <template #content>
      <div class="text-xs text-(--text-muted) leading-snug line-clamp-3 min-h-12">
        {{ description }}
      </div>
    </template>

    <template #footer>
      <div
        v-if="$slots['footer-extra']"
        class="mt-auto pt-3 border-t border-(--border-color)/30 flex flex-wrap gap-1.5"
      >
        <slot name="footer-extra"></slot>
      </div>
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-card) {
  background: transparent;
  color: inherit;
  box-shadow: none;
  border-radius: 0;
}
:deep(.p-card-body) {
  padding: 0.85rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
:deep(.p-card-content) {
  padding: 0;
  margin: 0;
  flex: 1;
}
:deep(.p-card-title) {
  padding: 0;
  margin: 0;
}
:deep(.p-card-footer) {
  padding: 0;
  margin-top: auto;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
