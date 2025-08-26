<script lang="ts" setup>
import MenuIcon from '../assets/menu.svg?component'
import AppHeader from '../components/layout/AppHeader.vue'
import PilotIcon from '../assets/pilot.svg?component'
import PointIcon from '../assets/point.svg?component'
import ListIcon from '../assets/list.svg?component'
import WalletIcon from '../assets/wallet.svg?component'
import CarIcon from '../assets/car.svg?component'

import Button from '../components/ui/Button.vue'

import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getToken, clearToken } from '../features/auth/tokenStorage'

const pilots = [
    {
        name: 'Pilot 1',
        brams: [
            {
                name: 'Szlaban Grzybowska 1',
            },
            {
                name: 'Szlaban Grzybowska 2',
            },
            {
                name: 'Szlaban Grzybowska 3',
            },
        ]
    },
    {
        name: 'Pilot 2',
        brams: [
            {
                name: 'Brama Wyjazdowa Śląska 1',
            },
            {
                name: 'Brama Wyjazdowa Śląska 2',
            },
            {
                name: 'Szlaban Grzybowska 3',
            },
        ]
    },
    {
        name: 'Pilot 3',
        brams: [
            {
                name: 'Brama garażowa 1',
            },
            {
                name: 'Brama garażowa 2',
            },
            {
                name: 'Brama garażowa 3',
            },
        ]
    }
]

const activeIndex = ref(0)
const currentPilot = computed(() => pilots[activeIndex.value])
const activeBramIndex = ref(0)

// Reset active bram when switching pilot
watch(activeIndex, () => {
    activeBramIndex.value = 0
})

const router = useRouter()
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
                    <Button v-for="(bram, index) in currentPilot.brams" :key="index" @click="activeBramIndex = index" :active="index === activeBramIndex">
                        {{ bram.name }}
                    </Button>
                </div>

                <p class="text-lg text-primary text-center">Wybierz bramę, by otworzyć</p>
            </div>
        </div>

        <div class="flex justify-center gap-4 mt-10">
            <span v-for="(_, i) in pilots" :key="i" @click="activeIndex = i"
                class="inline-block rounded-full cursor-pointer h-6 w-6 inner-shadow"
                :class="{ 'bg-primary': activeIndex === i }"></span>
        </div>
    </div>

    <nav class="flex gap-4 justify-around flex-1">
        <RouterLink class="p-1" to="/"><PointIcon class="text-gray-500" /></RouterLink>
        <RouterLink class="p-1" to="/"><ListIcon class="text-gray-500" /></RouterLink>  
        <RouterLink class="p-1" to="/"><CarIcon class="text-gray-500" /></RouterLink>  
        <RouterLink class="p-1" to="/"><WalletIcon class="text-gray-500" /></RouterLink>  
        <RouterLink class="p-1" to="/"><MenuIcon class="text-gray-500" /></RouterLink>  
    </nav>
</template>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 -1px 3px 0 rgba(56, 50, 50, 0.25);
}
</style>
