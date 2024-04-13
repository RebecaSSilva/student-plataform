// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [  
  {
    path: '/',  name: 'Home',
    component: () => import('../HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',   name: 'Login',
    component: () => import('../components/LoginRegister.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
