<template>
  <header
    class="rounded-b-xl p-8 text-primary shadow bg-gradient-to-b from-orange-start to-orange-end relative min-h-72"
  >
    <div class="flex items-top gap-6">
      <button
        v-if="showBack"
        @click="$emit('back')"
        class="flex items-center justify-center gap-2 border-3 w-10 h-10 rounded-full cursor-pointer"
      >
        <ArrowIcon />
      </button>

      <h1 class="text-2xl font-bold text-[32px]"><slot name="title" /></h1>
    </div>

    <HeaderImage class="text-white absolute right-0 bottom-0" />
  </header>
</template>

<script setup lang="ts">
import ArrowIcon from '../../assets/arrow.svg?component'
import HeaderImage from '../../assets/header-bg-image.svg?component'

defineProps<{ showBack?: boolean }>()
</script>
