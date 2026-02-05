<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const menuOpen = ref(false)
const isDark = ref(false)
const authStore = useAuthStore()
const isHomePage = computed(() => route.path === '/')
let lastScrollPosition = 0

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  scrolled.value = currentScrollPosition > 50

  if (currentScrollPosition > window.innerHeight / 2) {
    hidden.value = currentScrollPosition > lastScrollPosition
  } else {
    hidden.value = false
  }
  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Initialize theme from localStorage or default to Light
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = false // Light by default
  }
  updateTheme()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    id="navbar"
    :class="[
      'fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center transition-all duration-500 ease-in-out px-6 md:px-12',
      scrolled || menuOpen
        ? 'top-4 w-[92%] md:w-[85%] rounded-2xl md:rounded-full bg-(--glass-bg) backdrop-blur-md border border-(--glass-border) shadow-2xl'
        : 'top-6 md:top-12 w-[95%] h-16 bg-transparent',
      hidden && !menuOpen ? '-translate-y-32' : 'translate-y-0',
      scrolled || menuOpen ? 'h-14' : 'h-16',
    ]"
  >
    <!-- Logo Section -->
    <div class="flex items-center gap-3">
      <RouterLink to="/" class="flex items-center gap-3 group" @click="menuOpen = false">
        <div class="relative">
          <img
            src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png"
            alt="Logo"
            class="h-8 md:h-10 w-auto brightness-110 group-hover:scale-110 transition-transform"
          />
        </div>
        <p
          :class="[
            'text-base md:text-lg font-black tracking-tighter uppercase italic',
            isHomePage && !scrolled && !menuOpen ? 'text-white' : 'text-(--text-main)',
          ]"
        >
          GameFest
        </p>
      </RouterLink>
    </div>

    <div
      :class="[
        'hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest',
        isHomePage && !scrolled && !menuOpen ? 'text-white' : 'text-(--text-main)',
      ]"
    >
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/games" class="nav-link">Juegos</RouterLink>
      <RouterLink to="/events" class="nav-link">Eventos</RouterLink>
      <RouterLink
        v-if="authStore.user?.role === 'ADMIN'"
        to="/admin"
        class="nav-link text-(--primary)!"
        >Admin</RouterLink
      >
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-2 md:gap-4">
      <!-- Theme Toggle Desktop -->
      <button
        @click="toggleTheme"
        :class="[
          'hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-(--surface-2)/50 border border-(--border-color)/50 hover:border-(--primary) transition-all',
          isHomePage && !scrolled && !menuOpen ? 'text-white' : 'text-(--text-main)',
        ]"
        title="Cambiar tema"
      >
        <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun']"></i>
      </button>

      <!-- Login Button Desktop -->
      <RouterLink
        :to="authStore.isAuthenticated() ? '/profile' : '/login'"
        class="mobile-nav-link text-(--primary) font-black"
        @click="menuOpen = false"
      >
        <i class="pi pi-user mr-3"></i>
        {{
          authStore.isAuthenticated() ? authStore.user?.username || 'Mi Cuenta' : 'Iniciar Sesión'
        }}
      </RouterLink>

      <button
        @click="toggleMenu"
        :class="[
          'flex md:hidden w-9 h-9 items-center justify-center rounded-lg bg-(--surface-2) border border-(--border-color)',
          isHomePage && !scrolled && !menuOpen ? 'text-white' : 'text-(--text-main)',
        ]"
      >
        <i :class="['pi', menuOpen ? 'pi-times' : 'pi-bars', 'text-sm']"></i>
      </button>
    </div>

    <!-- Mobile Menu Slide Down -->
    <div
      v-if="menuOpen"
      class="absolute top-full left-0 right-0 mt-2 bg-(--glass-bg) backdrop-blur-xl border border-(--glass-border) rounded-2xl overflow-hidden flex flex-col md:hidden p-4 gap-2 animate-in slide-in-from-top-4 duration-300"
    >
      <RouterLink to="/" class="mobile-nav-link" @click="menuOpen = false">
        <i class="pi pi-home mr-3 text-(--primary)"></i> Inicio
      </RouterLink>
      <RouterLink to="/games" class="mobile-nav-link" @click="menuOpen = false">
        <i class="pi pi-box mr-3 text-(--primary)"></i> Juegos
      </RouterLink>
      <RouterLink to="/events" class="mobile-nav-link" @click="menuOpen = false">
        <i class="pi pi-calendar mr-3 text-(--primary)"></i> Eventos
      </RouterLink>
      <RouterLink
        v-if="authStore.user?.role === 'ADMIN'"
        to="/admin"
        class="mobile-nav-link text-(--primary)!"
        @click="menuOpen = false"
      >
        <i class="pi pi-shield mr-3"></i> Admin
      </RouterLink>

      <button @click="toggleTheme" class="mobile-nav-link">
        <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun', 'mr-3 text-(--primary)']"></i>
        {{ isDark ? 'Modo Oscuro' : 'Modo Claro' }}
      </button>

      <div class="h-px bg-(--border-color) my-2"></div>
      <RouterLink
        :to="authStore.isAuthenticated() ? '/profile' : '/login'"
        class="mobile-nav-link text-(--primary) font-black"
        @click="menuOpen = false"
      >
        <i class="pi pi-user mr-3"></i>
        {{
          authStore.isAuthenticated() ? authStore.user?.username || 'Mi Cuenta' : 'Iniciar Sesión'
        }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
  transition: color 0.3s;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}
.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}
.router-link-active {
  color: var(--primary);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.75rem;
  color: var(--text-main);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}
.mobile-nav-link:active,
.mobile-nav-link.router-link-active {
  background: var(--surface-2);
  color: var(--primary);
}
</style>
