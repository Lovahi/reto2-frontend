<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const hidden = ref(false)
const menuOpen = ref(false)
const currentTheme = ref('system') // 'light', 'dark', 'system'
let lastScrollPosition = 0

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const themes = {
  light: { icon: 'pi-sun', next: 'dark', label: 'Claro' },
  dark: { icon: 'pi-moon', next: 'system', label: 'Oscuro' },
  system: { icon: 'pi-desktop', next: 'light', label: 'Sistema' },
}

const toggleTheme = () => {
  const nextTheme = themes[currentTheme.value].next
  applyTheme(nextTheme)
}

const applyTheme = (theme) => {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)

  const root = document.documentElement

  if (theme === 'system') {
    root.removeAttribute('data-theme')
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', isDark)
  } else {
    root.setAttribute('data-theme', theme)
    root.classList.toggle('dark', theme === 'dark')
  }
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
  const savedTheme = localStorage.getItem('theme') || 'system'
  applyTheme(savedTheme)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    id="navbar"
    :class="[
      'fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center transition-all duration-500 ease-in-out px-6 md:px-8',
      scrolled || menuOpen
        ? 'top-4 w-[92%] md:w-[85%] rounded-2xl md:rounded-full bg-(--glass-bg) backdrop-blur-md border border-(--glass-border) shadow-2xl'
        : 'top-6 w-[95%] h-16 bg-transparent',
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
          class="text-(--text-main) text-base md:text-lg font-black tracking-tighter uppercase italic"
        >
          GameFest
        </p>
      </RouterLink>
    </div>

    <!-- Desktop Menu -->
    <div
      class="hidden md:flex gap-8 text-(--text-main) text-sm font-bold uppercase tracking-widest"
    >
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/games" class="nav-link">Juegos</RouterLink>
      <RouterLink to="/events" class="nav-link">Eventos</RouterLink>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-2 md:gap-4">
      <!-- Theme Toggle -->
      <button
        @click="toggleTheme"
        class="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-(--surface-2) text-(--text-main) border border-(--border-color) hover:border-(--primary) transition-all group"
      >
        <i :class="['pi', themes[currentTheme].icon, 'text-xs md:text-base']"></i>
      </button>

      <!-- Login Button Desktop -->
      <RouterLink
        to="/login"
        class="hidden sm:flex relative overflow-hidden group px-5 py-2 rounded-full bg-(--primary) text-(--bg-color) font-black text-[10px] md:text-xs uppercase tracking-tighter transition-all"
      >
        Entrar
      </RouterLink>

      <!-- Hamburger Button (Mobile Only) -->
      <button
        @click="toggleMenu"
        class="flex md:hidden w-9 h-9 items-center justify-center rounded-lg bg-(--surface-2) text-(--text-main) border border-(--border-color)"
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
      <div class="h-px bg-(--border-color) my-2"></div>
      <RouterLink
        to="/login"
        class="mobile-nav-link text-(--primary) font-black"
        @click="menuOpen = false"
      >
        <i class="pi pi-user mr-3"></i> Mi Cuenta
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
  background: linear-gradient(90deg, var(--primary), var(--secondary));
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
