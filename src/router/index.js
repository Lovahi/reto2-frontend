import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '../views/GamesView.vue'
import EventsView from '../views/EventsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MyEventsView from '@/views/MyEventsView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/myevents',
      name: 'myevents',
      component: MyEventsView,
      meta: { requiresAuth: true } 
    }
  ],
})

router.beforeEach(async (to, from) => {
    const store = useAuthStore(); 

    //Si la ruta requiere estar autenticado y NO lo estoy...
    if (to.meta.requiresAuth && !store.isAuthenticated) {
        return { name: 'login' } // ...te mando al login
    }

    //Si la ruta requiere ser ADMIN y no lo soy...
    if (to.meta.requiresAdmin && !store.isAdmin) {
         return { name: 'home' } // ...te echo al home
    }
});
export default router
