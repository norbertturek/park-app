import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { setupMocks } from './mocks'

import LoginView from './pages/LoginView.vue'
import AppView from './pages/AppView.vue'

// Start MSW in development to mock GraphQL requests
if (import.meta.env.DEV) {
  await setupMocks()
}

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
