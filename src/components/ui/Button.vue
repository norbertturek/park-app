<template>
    <button class="px-4 py-2 rounded-lg border-2 transition-colors cursor-pointer font-medium text-center"
        :class="active ? 'bg-primary text-white border-primary' : 'border-primary hover:bg-gray-200'"
        :aria-pressed="active">
        <slot />
    </button>
</template>

<script setup lang="ts">
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
</script>
