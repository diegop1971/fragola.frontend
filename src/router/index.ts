import { createRouter, createWebHistory} from 'vue-router'


/* frontoffice */
import Home from '../views/frontoffice/catalog/MainCatalogView.vue';
import Cart from '../views/frontoffice/cart/CartView.vue';
import Login from '../views/frontoffice/auth/UsersLogin.vue';
import Register from '../components/Register.vue';

/* backoffice */
import AdminPanel from '@/views/backoffice/adminPanel/AdminPanelView.vue';
import IndexProductsComponent from '@/components/backoffice/products/IndexProductsComponent.vue';
import IndexCategoriesComponent from '@/components/backoffice/categories/IndexCategoriesComponent.vue';
import dashboardComponent from '@/components/backoffice/dashboard/dashboardComponent.vue'
import CreateProductComponent from '@/components/backoffice/products/CreateProductComponent.vue'
import EditProductComponent from '@/components/backoffice/products/EditProductComponent.vue'
import StockComponent from '@/components/backoffice/stock/StockComponent.vue'

import TestComponent from '@/components/backoffice/products/TestComponent.vue'

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
          path: '',
          name: 'dashboard',
          component: dashboardComponent,
        },
        /* Categories */
        {
          path: 'categories',
          name: 'categories',
          component: IndexCategoriesComponent,
        },
        /* Products */
        {
          path: 'products',
          name: 'products',
          component: IndexProductsComponent,
        },
        {
          path: 'product/create',
          name: 'create-product',
          component: CreateProductComponent,
        },
        {
          path: '/edit-product/:productId',
          name: 'edit-product',
          component: EditProductComponent,
        },
        {
          path: 'stock',
          name: 'stock',
          component: StockComponent,
        },
        {
          path: 'test',
          name: 'test',
          component: TestComponent,
        },
      ]
    },
  ]
})

export default router
