import { createRouter, createWebHistory } from 'vue-router'
import PruebaView from '../views/Prueba.vue' 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/prueba',     
      name: 'prueba',
      component: PruebaView
    },
  ],
})

export default router
