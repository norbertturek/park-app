import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { setupMocks } from './mocks'

import LoginView from './pages/LoginView.vue'
import AppView from './pages/AppView.vue'

// Start MSW in all environments to mock GraphQL requests (required for Vercel demo)
// if (import.meta.env.DEV) {
await setupMocks()
// }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/app',
      name: 'App',
      component: AppView,
    },
  ],
})

const app = createApp(App).use(router)
app.mount('#app')
