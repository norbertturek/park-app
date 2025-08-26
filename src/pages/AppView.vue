<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { clearToken, getToken } from '@/features/auth/tokenStorage'
import navItems from '@data/navItems'
import pilots from '@data/pilots'

import AppHeader from '@components/layout/AppHeader.vue'
import NavBar from '@components/layout/NavBar.vue'
import Button from '@components/ui/Button.vue'
import UiDot from '@components/ui/UiDot.vue'
import UiIconLink from '@components/ui/UiIconLink.vue'
import PilotIcon from '@/assets/pilot.svg?component'

const router = useRouter()
const activeIndex = ref(0)
const currentPilot = computed(() => pilots[activeIndex.value])
const activeBramIndex = ref(0)

// Reset active bram when switching pilot
watch(activeIndex, () => {
    activeBramIndex.value = 0
})

function onBack() {
    clearToken()
    router.replace('/')
}

onMounted(() => {
    if (!getToken()) {
        router.replace('/')
    }
})
</script>

<template>
    <AppHeader :showBack="true" @back="onBack">
        <template #title>
            Otwórz<br> bramę
        </template>
    </AppHeader>

    <div class="flex flex-col py-12 md:items-center">
        <div class="flex flex-row gap-6">
            <PilotIcon />
            <div class="flex flex-col gap-6">
                <h2 class="text-2xl font-bold text-primary text-center">{{ currentPilot.name }}</h2>
                <div class="mt-4 flex flex-col gap-4 md:min-w-2xs">
                    <Button v-for="(bram, index) in currentPilot.brams" :key="index" @click="activeBramIndex = index"
                        :active="index === activeBramIndex">
                        {{ bram.name }}
                    </Button>
                </div>

                <p class="text-lg text-primary text-center">Wybierz bramę, by otworzyć</p>
            </div>
        </div>

        <div class="flex justify-center gap-4 mt-10">
            <UiDot v-for="(_, index) in pilots" :key="index" :active="activeIndex === index"
                @click="activeIndex = index" />
        </div>
    </div>

    <NavBar>
        <UiIconLink v-for="(item, i) in navItems" :key="i" :to="item.to" :ariaLabel="item.aria">
            <component :is="item.icon" class="text-gray-500" />
        </UiIconLink>
    </NavBar>
</template>

<style scoped>
</style>
