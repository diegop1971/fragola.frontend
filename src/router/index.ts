import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

/* frontoffice */
import Register from '../components/Register.vue'
import CheckoutSuccess from '@/components/frontoffice/checkout-success/CheckoutSuccess.vue'
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
import Error404AdminComponent from '@/components/backoffice/errors/Error404AdminComponent.vue'
import Error422AdminComponent from '@/components/backoffice/errors/Error422AdminComponent.vue'
import Error500AdminComponent from '@/components/backoffice/errors/Error500AdminComponent.vue'
import Error503AdminComponent from '@/components/backoffice/errors/Error503AdminComponent.vue'
import ETestComponent from '@/components/ETestComponent.vue'
import VariosComponent from '@/components/Varios.vue'
import ProductCards from '@/components/frontoffice/catalog/ProductCards.vue'
import ShoppingCart from '@/components/frontoffice/cart/ShoppingCart.vue'
import FrontOfficeMainLayout from '@/views/frontoffice/layouts/FrontOfficeMainLayout.vue'
import CheckoutCart from '@/components/frontoffice/checkout/CheckoutCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /********** routes frontoffice **********/
    {
      path: '/',
      component: FrontOfficeMainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: ProductCards
        },
        {
          path: '/cart',
          name: 'cart',
          component: ShoppingCart
        },
        {
          path: '/checkout-cart',
          name: 'checkout-cart',
          component: CheckoutCart,
        },
        {
          path: '/checkout-success',
          name: 'checkout-success',
          component: CheckoutSuccess
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
          path: '/varios',
          name: 'varios',
          component: VariosComponent
        },
        {
          path: '/etest',
          name: 'etest',
          component: ETestComponent
        }
      ]
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
          path: 'stock/create-stock-item/:productId?',
          name: 'create-stock-item',
          component: CreateStockComponent,
          beforeEnter: (to, from, next) => {
            const isValidUUID = (uuid: string | string[] | undefined): boolean => {
              if (!uuid) {
                return true
              }
              if (Array.isArray(uuid)) {
                return uuid.every((id) => isValidUUID(id))
              }
              const matchLetter: RegExpMatchArray | null = uuid.match(
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
        }

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

router.beforeEach((to, from, next) => {
  const cartStore = useCartStore()

  if (to.path === '/checkout-cart') {
    if (cartStore.counter > 0) {
      next();
    } else {
      next('/cart');
    }
  } else {
    next();
  }
})

export default router
