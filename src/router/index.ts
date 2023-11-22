import { createRouter, createWebHistory} from 'vue-router'

/* frontoffice */
import Home from '../views/frontoffice/catalog/MainCatalogView.vue';
import Cart from '../views/frontoffice/cart/CartView.vue';
import Login from '../views/frontoffice/auth/UsersLogin.vue';
import Register from '../components/Register.vue';
import MainTest from '../views/frontoffice/Test/MainTestView.vue';
import DashboardTest from '../views/frontoffice/Test/DashboardTestView.vue';

/* backoffice */
import Admin from '../views/backoffice/dashboard/AdminDashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* frontoffice */
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

    /* backoffice */
    {
      path: '/admin',
      name: 'admin',
      component: Admin 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardTest 
    },
  ]
})

export default router
