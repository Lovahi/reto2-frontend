<script setup>
import RegisterComponent from '@/components/RegisterComponent.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-24 md:pt-40 px-4 pb-12">
    <RegisterComponent />
  </div>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
}
</style>
