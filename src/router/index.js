import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import LoginView from '../views/accounts/LoginView.vue'
import RegisterView from '../views/accounts/RegisterView.vue'
import LogoutView from '../views/accounts/LogoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Trang Chủ - MTLKMS'
    }
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Đăng Nhập - MTLKMS'
    }
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Đăng Ký - MTLKMS'
    }
  },

  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
    meta: {
      title: 'Đăng Xuất - MTLKMS'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
