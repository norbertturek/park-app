<script setup lang="ts">
import LogoMark from './components/LogoMark.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isAppRoute = computed(() => route.path.startsWith('/app'))
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-slate-900">
    <!-- Top Nav -->
    <header v-if="!isAppRoute" class="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <LogoMark :size="32" />
          <span class="font-semibold tracking-tight">ParkApp</span>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer v-if="!isAppRoute"
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500 flex items-center justify-between">
      <span> {{ new Date().getFullYear() }} ParkApp</span>
    </footer>
  </div>
</template>