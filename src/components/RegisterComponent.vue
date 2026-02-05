<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const response = await authService.register({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    if (response) {
      // Generalmente después del registro redirigimos al login o iniciamos sesión automáticamente
      // Aquí redirigiremos al login para simplificar
      router.push('/login')
    }
  } catch (e) {
    error.value = 'Error al crear la cuenta. Por favor, inténtelo de nuevo.'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="max-w-md w-full animate-fade-up">
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

      <div
        v-if="error"
        class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center font-bold"
      >
        {{ error }}
      </div>

      <div class="space-y-6 mb-10">
        <div>
          <label
            for="username"
            class="block mb-2 text-xs font-bold uppercase tracking-widest text-(--text-muted) px-1"
            >Nombre de usuario</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-(--text-muted)/30"
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
            v-model="email"
            type="email"
            id="email"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-(--text-muted)/30"
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
            v-model="password"
            type="password"
            id="password"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-(--text-muted)/30"
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
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            class="w-full bg-(--surface-2) border border-(--border-color) text-(--text-main) rounded-xl px-4 py-3 outline-none focus:border-(--primary) transition-all placeholder:text-(--text-muted)/30"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 bg-(--primary) text-black font-black uppercase italic tracking-tighter rounded-xl hover:scale-[1.02] transition-all hover:bg-white shadow-xl mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <i v-if="loading" class="pi pi-spin pi-spinner text-lg"></i>
        <span>{{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}</span>
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
