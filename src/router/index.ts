import { createRouter, createWebHistory} from 'vue-router'


/* frontoffice */
import Home from '../views/frontoffice/catalog/MainCatalogView.vue';
import Cart from '../views/frontoffice/cart/CartView.vue';
import Login from '../views/frontoffice/auth/UsersLogin.vue';
import Register from '../components/Register.vue';

/* backoffice */
import AdminPanel from '@/views/backoffice/adminPanel/AdminPanelView.vue';
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

    /* backoffice */
    {
      path: '/admin',
      component: AdminPanel,
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
