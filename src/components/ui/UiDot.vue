<template>
  <button
    type="button"
    class="inline-block rounded-full cursor-pointer h-6 w-6 inner-shadow"
    :class="{ 'bg-primary': active }"
    :aria-current="active ? 'true' : 'false'"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps<{ active?: boolean }>()
</script>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 -1px 3px 0 rgba(56, 50, 50, 0.25);
}
</style>
