import { createRouter, createWebHistory } from 'vue-router'

/* frontoffice */
import Home from '../views/frontoffice/catalog/MainCatalogView.vue'
import Cart from '../views/frontoffice/cart/CartView.vue'
import Login from '../views/frontoffice/auth/UsersLogin.vue'
import Register from '../components/Register.vue'
import Error404EcommerceComponent from '@/components/frontoffice/errors/Error404EcommerceComponent.vue'
import Error500EcommerceComponent from '@/components/frontoffice/errors/Error500EcommerceComponent.vue'

/* backoffice */
import AdminPanel from '@/views/backoffice/adminPanel/AdminPanelView.vue'
import IndexProductsComponent from '@/components/backoffice/products/IndexProductsComponent.vue'
import IndexCategoriesComponent from '@/components/backoffice/categories/IndexCategoriesComponent.vue'
import dashboardComponent from '@/components/backoffice/dashboard/dashboardComponent.vue'
import CreateProductComponent from '@/components/backoffice/products/CreateProductComponent.vue'
import EditProductComponent from '@/components/backoffice/products/edit/EditProductComponent.vue'
import StockComponent from '@/components/backoffice/stock/StockComponent.vue'
import TestComponent from '@/components/backoffice/products/test/TestComponent.vue'
import Error404AdminComponent from '@/components/backoffice/errors/Error404AdminComponent.vue'
import Error500AdminComponent from '@/components/backoffice/errors/Error500AdminComponent.vue'

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
    path: '/:pathMatch(.*)*',
      beforeEnter: (to, from, next) => {
        next({ name: 'error404Ecommerce' }) // Redirige a la ruta error404 y cambia la URL
      },
      redirect: { name: 'error404Ecommerce' } // Agrega una propiedad redirect a la ruta
    },

    /*{
      path: '/:pathMatch(.*)*',
      beforeEnter: (to, from, next) => {
        if (to.path.startsWith('/admin')) {
          next({ name: 'error404Admin' }) // Redirige a la ruta error404Admin y cambia la URL
        } else {
          next({ name: 'error404Ecommerce' }) // Redirige a la ruta error404Ecommerce y cambia la URL
        }
      },
      redirect: { name: 'error404Ecommerce' } // Agrega una propiedad redirect a la ruta
    },*/

    {
      path: '/error404',
      name: 'error404Ecommerce',
      component: Error404EcommerceComponent
    },
    {
      path: '/error500',
      name: 'error500',
      component: Error500EcommerceComponent
    },
    {
      path: '/errors/error404',
      name: 'error404Admin',
      component: Error404AdminComponent
    },
    {
      path: '/errors/error500',
      name: 'error500Admin',
      component: Error500AdminComponent
    },

    /********** backoffice ******************/
    {
      path: '/admin',
      component: AdminPanel,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: dashboardComponent
        },
        /* Categories */
        {
          path: 'categories',
          name: 'categories',
          component: IndexCategoriesComponent
        },
        /* Products */
        {
          path: 'products',
          name: 'products',
          component: IndexProductsComponent
        },
        {
          path: 'products/create-product',
          name: 'create-product',
          component: CreateProductComponent
        },
        {
          path: 'products/test',
          name: 'test',
          component: TestComponent
        },
        {
          path: 'stock',
          name: 'stock',
          component: StockComponent
        }
      ]
    }
  ]
})

export default router
