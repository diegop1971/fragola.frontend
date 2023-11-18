import { createRouter, createWebHistory} from 'vue-router'

import Home from '../views/frontend/catalog/MainCatalogView.vue';
import Cart from '../views/frontend/cart/CartView.vue';
import Login from '../views/frontend/auth/UsersLogin.vue';
import Register from '../components/Register.vue';
import MainTest from '../views/frontend/Test/MainTestView.vue';
import DashboardTest from '../views/frontend/Test/DashboardTestView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart 
    },
    {
      path: '/login',
      name: 'login',
      component: Login 
    },
    {
      path: '/register',
      name: 'register',
      component: Register 
    },
    {
      path: '/main',
      name: 'main',
      component: MainTest 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardTest 
    },
  ]
})

export default router
