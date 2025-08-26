<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin } from '../features/auth/useLogin'
import { getToken, clearToken } from '../features/auth/tokenStorage'
import LogoMark from '../components/LogoMark.vue'

const form = reactive({ email: 'demo@park.app', password: 'demo' })
const { login, loading, error } = useLogin()
const loggedIn = ref(!!getToken())
const router = useRouter()

async function onSubmit(e: Event) {
  e.preventDefault()
  if (!form.email || !form.password) return
  const res = await login({ email: form.email, password: form.password })
  if (res) {
    loggedIn.value = true
    router.push('/app')
  }
}

function logout() {
  clearToken()
  loggedIn.value = false
}

onMounted(() => {
  if (getToken()) {
    router.replace('/app')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex items-center gap-3 mb-6">
          <LogoMark :size="32" roundedClass="rounded-full" bgClass="bg-blue-600" textClass="text-white" />
          <h2 class="text-2xl font-semibold tracking-tight text-gray-900">Sign in to ParkApp</h2>
        </div>

        <!-- Logged in state -->
        <div v-if="loggedIn" class="space-y-6">
          <div class="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            <LogoMark :size="20" label="✓" bgClass="bg-green-600" textClass="text-white" roundedClass="rounded-full" />
            <div>
              <p class="font-medium">Logged in</p>
              <p class="text-sm text-green-700">You are successfully authenticated.</p>
            </div>
          </div>
          <button
            class="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition"
            @click="logout"
          >
          </button>
        </div>

        <!-- Login form -->
        <form v-else @submit="onSubmit" class="space-y-6">
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                class="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="you@example.com"
                v-model.trim="form.email"
                required
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700" for="password">Password</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clip-rule="evenodd" />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                class="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                v-model.trim="form.password"
                required
              />
            </div>
          </div>

          <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading || !form.email || !form.password"
            class="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            <svg v-if="loading" class="-ml-1 mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>{{ loading ? 'Signing in…' : 'Sign in' }}</span>
          </button>

          <p class="text-xs text-gray-500 text-center">Tip: demo@park.app / demo</p>
        </form>
      </div>
    </div>
  </div>
</template>