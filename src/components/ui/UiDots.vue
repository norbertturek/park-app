<template>
  <div class="flex justify-center gap-4" v-bind="$attrs">
    <button
      v-for="i in count"
      :key="i"
      type="button"
      class="inline-block rounded-full cursor-pointer h-6 w-6 inner-shadow"
      :class="{ 'bg-primary': modelValue === i - 1 }"
      :aria-current="modelValue === i - 1 ? 'true' : 'false'"
      @click="onClick(i - 1)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ count: number; modelValue: number; clickable?: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

function onClick(idx: number) {
  if (props.clickable === false) return
  emit('update:modelValue', idx)
}
</script>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 -1px 3px 0 rgba(56, 50, 50, 0.25);
}
</style>
