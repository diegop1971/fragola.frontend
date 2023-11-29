import { createRouter, createWebHistory} from 'vue-router'


/* frontoffice */
import Home from '../views/frontoffice/catalog/MainCatalogView.vue';
import Cart from '../views/frontoffice/cart/CartView.vue';
import Login from '../views/frontoffice/auth/UsersLogin.vue';
import Register from '../components/Register.vue';
import MainTest from '../views/frontoffice/Test/MainTestView.vue';

/* backoffice */
//import MainDashboardview from '../views/backoffice/dashboard/main/MainDashboardView.vue';
import AdminDashboardLayoutVue from '@/components/backoffice/layouts/AdminDashboardLayout.vue';
import IndexComponent from '@/components/backoffice/products/IndexComponent.vue';
import ShowComponent from '@/components/backoffice/products/ShowComponent.vue';

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
      component: AdminDashboardLayoutVue,
      children: [
        {
          path: 'show',
          name: 'show',
          component: ShowComponent,
        },
        {
          path: '',
          name: 'index',
          component: IndexComponent,
        }
      ]
    },
  ]
})

export default router
