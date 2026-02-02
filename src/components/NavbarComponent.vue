<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const hidden = ref(false)
const currentTheme = ref('system') // 'light', 'dark', 'system'
let lastScrollPosition = 0

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
  } else {
    root.setAttribute('data-theme', theme)
  }
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

  // Efecto de cristal al bajar un poco
  scrolled.value = currentScrollPosition > 50

  // Ocultar si bajamos, mostrar si subimos
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
      'fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center transition-all duration-500 ease-in-out px-8 rounded-full',
      scrolled
        ? 'top-4 w-[90%] md:w-[80%] h-14 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-2xl'
        : 'top-6 w-[95%] h-16 bg-transparent',
      hidden ? '-translate-y-32' : 'translate-y-0',
    ]"
  >
    <div class="flex items-center gap-3">
      <div class="relative group">
        <img
          src="../assets/sources/img/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png"
          alt="Logo"
          class="h-10 w-auto brightness-110 group-hover:scale-110 transition-transform"
        />
        <div
          class="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"
        ></div>
      </div>
      <p class="text-[var(--text-main)] text-lg font-black tracking-tighter uppercase italic">
        GameFest
      </p>
    </div>

    <div
      class="hidden md:flex gap-10 text-[var(--text-main)] text-sm font-bold uppercase tracking-widest"
    >
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/games" class="nav-link">Juegos</RouterLink>
      <RouterLink to="/events" class="nav-link">Eventos</RouterLink>
    </div>

    <div class="flex items-center gap-4">
      <!-- Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all group"
        :title="`Tema actual: ${themes[currentTheme].label}`"
      >
        <i
          :class="['pi', themes[currentTheme].icon, 'group-hover:rotate-12 transition-transform']"
        ></i>
      </button>

      <RouterLink
        to="/login"
        class="relative overflow-hidden group px-6 py-2 rounded-full bg-[var(--primary)] text-black font-black text-xs uppercase tracking-tighter transition-all hover:pr-8"
      >
        <span class="relative z-10">Entrar</span>
        <i
          class="pi pi-arrow-right absolute right-2 opacity-0 group-hover:opacity-100 transition-all text-xs"
        ></i>
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
</style>

<!-- src="../assets/Gemini_Generated_Image_segyufsegyufsegy-Photoroom.png"  -->
