<script setup lang="ts">
interface Props {
  label?: string
  size?: number // in px
  bgClass?: string
  textClass?: string
  roundedClass?: string
}

const { label = 'P', size = 32, bgClass = 'bg-blue-600', textClass = 'text-white', roundedClass = 'rounded-full' } = defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center font-semibold select-none" :class="[bgClass, textClass, roundedClass]"
    :style="{ width: `${size}px`, height: `${size}px` }">
    {{ label }}
  </div>
</template>