<script lang="ts" setup>
import MenuIcon from '../assets/menu.svg?component'
import ArrowIcon from '../assets/arrow.svg?component'
import HeaderImage from '../assets/header-bg-image.svg?component'
import PilotIcon from '../assets/pilot.svg?component'
import PointIcon from '../assets/point.svg?component'
import ListIcon from '../assets/list.svg?component'
import WalletIcon from '../assets/wallet.svg?component'
import CarIcon from '../assets/car.svg?component'

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
    <header
        class="rounded-b-xl p-8 text-primary shadow bg-gradient-to-b from-orange-start to-orange-end relative min-h-72">
        <div class="flex items-top gap-6">
            <button @click="onBack" class="flex items-center justify-center gap-2 border-3 w-10 h-10 rounded-full">
                <ArrowIcon />
            </button>

            <h1 class="text-2xl font-bold text-[32px]">Otwórz<br> bramę</h1>
        </div>

        <HeaderImage class="text-white absolute right-0 bottom-0" />
    </header>

    <div class="flex flex-col py-12 md:items-center">
        <div class="flex flex-row gap-6">
            <PilotIcon />
            <div class="flex flex-col gap-6">
                <h2 class="text-2xl font-bold text-primary text-center">{{ currentPilot.name }}</h2>
                <div class="mt-4 flex flex-col gap-4 md:min-w-2xs">
                    <button v-for="(bram, j) in currentPilot.brams" :key="j" @click="activeBramIndex = j"
                        class="px-4 py-2 rounded-lg border-2 transition-colors cursor-pointer font-medium text-center"
                        :class="j === activeBramIndex ? 'bg-primary text-white border-primary' : 'border-primary hover:bg-gray-200'"
                        :aria-pressed="j === activeBramIndex">
                        {{ bram.name }}
                    </button>
                </div>

                <p class="text-lg text-primary text-center">Wybierz bramę, by otworzyć</p>
            </div>
        </div>

        <div class="flex justify-center gap-4 mt-10">
            <span v-for="(p, i) in pilots" :key="i" @click="activeIndex = i"
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
