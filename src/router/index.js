import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Vistahome.vue' 
import Videojuegos from '../views/Videojuegos.vue'
import Eventos from '../views/Eventos.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/videojuegos', 
      name: 'videojuegos',
      component: Videojuegos 
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: Eventos
    }
  ]
})

export default router