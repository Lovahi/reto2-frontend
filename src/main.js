import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '#ff8b00',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: 'var(--bg-color)',
          50: 'var(--surface)',
          100: 'var(--surface-2)',
          200: 'var(--surface-2)',
          300: 'var(--surface-3)',
          400: 'var(--surface-3)',
          500: 'var(--surface-3)',
          600: 'var(--surface-3)',
          700: 'var(--surface-3)',
          800: 'var(--surface-3)',
          900: 'var(--surface-3)',
          950: 'var(--surface-3)',
        },
        content: {
          background: 'var(--bg-color)',
          borderColor: 'var(--border-color)',
        },
      },
      dark: {
        surface: {
          0: 'var(--bg-color)',
          50: 'var(--surface)',
          100: 'var(--surface-2)',
          200: 'var(--surface-2)',
          300: 'var(--surface-3)',
          400: 'var(--surface-3)',
          500: 'var(--surface-3)',
          600: 'var(--surface-3)',
          700: 'var(--surface-3)',
          800: 'var(--surface-3)',
          900: 'var(--surface-3)',
          950: 'var(--surface-3)',
        },
        content: {
          background: 'var(--bg-color)',
          borderColor: 'var(--border-color)',
        },
      },
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

// --- CONFIGURACIÓN DE PRIMEVUE CON TEMA PROPIO ---
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark', // Usaremos la clase .dark para sincronizar con Tailwind
      cssLayer: false, // Desactivar capas si hay conflictos con tailwind 4
    },
  },
})
app.mount('#app')
