import { worker } from './browser'

export async function setupMocks() {
  // Start the Service Worker in development only
  if (import.meta.env.DEV) {
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}
