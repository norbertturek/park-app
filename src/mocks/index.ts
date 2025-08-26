import { worker } from './browser'

export async function setupMocks() {
  // Start the Service Worker in all environments (needed for Vercel demo)
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/mockServiceWorker.js' },
  })
}
