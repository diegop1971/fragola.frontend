import { createRouter, createWebHistory } from 'vue-router'

/* frontoffice */
import Register from '../components/Register.vue'
import Home from '../views/frontoffice/catalog/MainCatalogView.vue'
import Cart from '../views/frontoffice/cart/CartView.vue'
import Login from '../views/frontoffice/auth/UsersLogin.vue'
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
import CreateStockComponent from '@/components/backoffice/stock/CreateStockComponent.vue'
import StockByProductIdComponent from '@/components/backoffice/stock/StockByProductIdComponent.vue'
import TestComponent from '@/components/backoffice/products/test/TestComponent.vue'
import Error404AdminComponent from '@/components/backoffice/errors/Error404AdminComponent.vue'
import Error422AdminComponent from '@/components/backoffice/errors/Error422AdminComponent.vue'
import Error500AdminComponent from '@/components/backoffice/errors/Error500AdminComponent.vue'
import Error503AdminComponent from '@/components/backoffice/errors/Error503AdminComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /********** routes frontoffice **********/
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
    /********** fin routes frontoffice **********/

    /********** routes backoffice **********/
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
        /* Stock */
        {
          path: 'stock',
          name: 'stock',
          component: StockComponent
        },
        {
          path: '/admin/stock/by-product-id/:productId',
          name: 'stock-by-product-id',
          component: StockByProductIdComponent,
          beforeEnter: (to, from, next) => {
            const isValidUUID = (uuid: string | string[]) => {
              const s = '' + uuid
              const matchLetter: RegExpMatchArray | null = s.match(
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
              )
              return matchLetter !== null
            }
            if (isValidUUID(to.params.productId)) {
              next()
            } else {
              next({ name: 'not-found-admin', replace: true }) // Muestra la página de error 404Admin sin cambiar la URL
            }
          }
        },
        {
          path: 'stock/create-stock-item',
          name: 'create-stock-item',
          component: CreateStockComponent
        },
        /*{
          path: '/admin/stock/edit/:stockId',
          name: 'edit',
          component: EditStockComponent,
          beforeEnter: (to, from, next) => {
            const isValidUUID = (uuid: string | string[]) => {
              const s = '' + uuid
              const matchLetter: RegExpMatchArray | null = s.match(
                /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
              )
              return matchLetter !== null
            }
            if (isValidUUID(to.params.stockId)) {
              next()
            } else {
              next({ name: 'not-found-admin', replace: true }) // Muestra la página de error 404Admin sin cambiar la URL
            }
          }
        },*/
        
        {
          path: 'products/test',
          name: 'test',
          component: TestComponent
        },

        /********** fin routes backoffice **********/
      ]
    },
    /********** frontoffice errors **********/
    {
      path: '/error500',
      name: 'error500',
      component: Error500EcommerceComponent
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: Error404EcommerceComponent
    },
    /********** fin frontoffice errors **********/

    /********** backoffice errors **********/
    {
      path: '/admin/products/edit-product/:productId',
      name: 'edit-product',
      component: EditProductComponent,
      beforeEnter: (to, from, next) => {
        const isValidUUID = (uuid: string | string[]) => {
          const s = '' + uuid
          const matchLetter: RegExpMatchArray | null = s.match(
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
          )
          return matchLetter !== null
        }
        if (isValidUUID(to.params.productId)) {
          next()
        } else {
          next({ name: 'not-found-admin', replace: true }) // Muestra la página de error 404Admin sin cambiar la URL
        }
      }
    },
    {
      path: '/admin/:pathMatch(.*)*',
      name: 'not-found-admin',
      component: Error404AdminComponent
    },
    {
      path: '/admin/errors/error404',
      name: 'error404Admin',
      component: Error404AdminComponent
    },
    {
      path: '/admin/errors/error422',
      name: 'error500Admin',
      component: Error422AdminComponent
    },
    {
      path: '/admin/errors/error500',
      name: 'error500Admin',
      component: Error500AdminComponent
    },
    {
      path: '/admin/errors/error503',
      name: 'error503Admin',
      component: Error503AdminComponent
    }
    /********** backoffice errors **********/
  ]
})

export default router
