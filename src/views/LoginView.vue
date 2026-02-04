<script setup>
import LoginComponent from '@/components/LoginComponent.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-20 px-4">
    <LoginComponent />
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
