<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-20 px-4">
    <form class="max-w-md w-full animate-fade-up">
      <div
        class="bg-(--surface) backdrop-blur-xl p-10 rounded-3xl border border-(--border-color) shadow-2xl"
      >
        <div class="text-center mb-10">
          <h2 class="text-3xl font-black italic uppercase tracking-tighter text-(--text-main)">
            Bienvenido<span class="text-(--primary)">!</span>
          </h2>
          <p class="text-(--text-muted) text-sm mt-2 uppercase tracking-widest">
            Inicia sesión en tu cuenta de GameFest
          </p>
        </div>

        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-gray-600"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div class="mb-10">
          <label
            for="password"
            class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-gray-600"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-xl hover:scale-[1.02] transition-all hover:bg-white shadow-xl mb-6"
        >
          Iniciar Sesión
        </button>

        <p class="text-center text-sm text-gray-400">
          ¿No tienes cuenta?
          <RouterLink
            to="/registro"
            class="text-white font-bold hover:text-(--primary) transition-colors"
            >Regístrate</RouterLink
          >
        </p>
      </div>
    </form>
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
