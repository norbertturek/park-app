import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { setupMocks } from './mocks'

// Start MSW in development to mock GraphQL requests
if (import.meta.env.DEV) {
  await setupMocks()
}

const app = createApp(App)
app.mount('#app')
