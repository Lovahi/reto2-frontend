<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-24 px-4 pb-12">
    <form class="max-w-md w-full animate-fade-up">
      <div
        class="bg-(--surface) backdrop-blur-xl p-10 rounded-3xl border border-(--border-color) shadow-2xl"
      >
        <div class="text-center mb-10">
          <h2 class="text-3xl font-black italic uppercase tracking-tighter text-(--text-main)">
            Únete a la<br /><span class="text-(--primary)">Elite Gaming</span>
          </h2>
          <p class="text-(--text-muted) text-sm mt-3 uppercase tracking-widest">
            Crea tu cuenta en GameFest hoy mismo
          </p>
        </div>

        <div class="space-y-6 mb-10">
          <div>
            <label
              for="username"
              class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
              >Nombre de usuario</label
            >
            <input
              type="text"
              id="username"
              class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-gray-600"
              placeholder="tu_usuario"
              required
            />
          </div>

          <div>
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

          <div>
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

          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
              >Confirmar Contraseña</label
            >
            <input
              type="password"
              id="confirm-password"
              class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-gray-600"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-xl hover:scale-[1.02] transition-all hover:bg-white shadow-xl mb-6"
        >
          Crear Cuenta
        </button>

        <p class="text-center text-sm text-(--text-muted)">
          ¿Ya tienes cuenta?
          <RouterLink
            to="/login"
            class="text-(--text-main) font-bold hover:text-(--primary) transition-colors"
            >Inicia Sesión</RouterLink
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
