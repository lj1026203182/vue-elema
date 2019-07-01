import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('./views/Order.vue'),
        },
        {
          path: '/me',
          name: 'Me',
          component: () => import('./views/Me.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/address',
      name: 'Address',
      component: () => import('./views/Address.vue')
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('./views/City.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/ShopStore/:id',
      name: 'ShopStore',
      component: () => import('./components/Shops/ShopStore.vue'),
    },
    {
      path: '/myLocation',
      name: 'MyLocation',
      component: () => import('./components/Me/MyLocation.vue'),
    },
    {
      path: '/myLocation/add',
      name: 'MyLocationAdd',
      component: () => import('./components/Me/MyLocationAdd.vue'),
    },
    {
      path: '/myLocation/edit',
      name: 'MyLocationEdit',
      component: () => import('./components/Me/MyLocationEdit.vue'),
    },
    {
      path: '/timetable',
      name: 'TimeTable',
      component: () => import('./components/Others/TimeTable.vue'),
    }
  ],

})


router.beforeEach((to, from, next) => {
  const isLogin = localStorage.login ? true : false;
  if (to.path == '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router