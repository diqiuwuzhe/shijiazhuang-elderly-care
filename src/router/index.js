import { createRouter, createWebHashHistory } from 'vue-router'
import { getCurrentUser } from '../utils/auth'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/List.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('../views/Favorites.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    }
  ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const { user } = await getCurrentUser()
  const publicPages = ['/', '/login', '/signup', '/list', '/detail']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router