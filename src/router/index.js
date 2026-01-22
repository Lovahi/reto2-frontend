import { createRouter, createWebHistory } from 'vue-router'
import Vistahome from '@/views/Vistahome.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vistahome',
      component: Vistahome
    },
  ],
})

export default router
