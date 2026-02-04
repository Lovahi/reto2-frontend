<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
    })

    // El backend devuelve el UserDTO directamente en caso de éxito
    if (response && response.id) {
      // Como el backend usa sesiones de PHP, el token es simbólico para el frontend
      authStore.setAuth('session-active', response)
      router.push('/')
    } else {
      error.value = 'Credenciales inválidas'
    }
  } catch (e) {
    error.value = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="max-w-md w-full animate-fade-up">
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

      <div
        v-if="error"
        class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center font-bold"
      >
        {{ error }}
      </div>

      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
          >Email</label
        >
        <input
          v-model="email"
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
          v-model="password"
          type="password"
          id="password"
          class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-gray-600"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-xl hover:scale-[1.02] transition-all hover:bg-white shadow-xl mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <i v-if="loading" class="pi pi-spin pi-spinner text-lg"></i>
        <span>{{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}</span>
      </button>

      <p class="text-center text-sm text-gray-400">
        ¿No tienes cuenta?
        <RouterLink
          to="/register"
          class="text-white font-bold hover:text-(--primary) transition-colors"
          >Regístrate</RouterLink
        >
      </p>
    </div>
  </form>
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
