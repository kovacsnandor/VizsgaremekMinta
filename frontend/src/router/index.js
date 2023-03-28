import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/taxiFuvarjai',
      name: 'taxiFuvarjai',
      component: () => import('../views/TaxiFuvarjaiView.vue')
    },
    {
      path: '/taxiKezeles',
      name: 'taxiKezeles',
      component: () => import('../views/TaxiKezelesView.vue')
    },
    {
      path: '/fuvarBevitel',
      name: 'fuvarBevitel',
      component: () => import('../views/FuvarBevitel.vue')
    },
    {
      path: '/count1',
      name: 'count1',
      component: () => import('../views/Count1View.vue')
    },
    {
      path: '/count2',
      name: 'count2',
      component: () => import('../views/Count2View.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
