<template>
  <RouterLink class="p-1" :to="to" :aria-label="ariaLabel">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ to: string; ariaLabel?: string }>()
</script>
