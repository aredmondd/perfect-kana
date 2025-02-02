<script setup>
import { ref, onMounted} from 'vue';
import ThemeCard from './ThemeCard.vue';
import themes from '../data/themes';
import { applyTheme } from '@/utils';

let localStorageThemeName = ref(JSON.parse(localStorage.getItem("theme")).name);

function applyAndCheckTheme(theme) {
    applyTheme(theme);
    localStorageThemeName.value = JSON.parse(localStorage.getItem("theme")).name;
}

function setRandomTheme() {
    let randomIndex = Math.floor(Math.random() * Object.keys(themes).length);
    let randomThemeName = Object.keys(themes)[randomIndex];
    applyTheme(themes[randomThemeName]);
    localStorageThemeName.value = JSON.parse(localStorage.getItem("theme")).name;
}
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <div v-for="theme in themes" :key=theme @click="applyAndCheckTheme(theme)" class="min-w-[100px]">
            <ThemeCard :theme="theme" :isActiveTheme="localStorageThemeName == theme.name"/>
        </div>
        <div class="rounded-xl p-2 hover:animate-slide-up rainbow-box min-w-[100px]" @click="setRandomTheme()">
            <p class="tracking-wide text-center text-black">random!</p>
        </div>
        <p class="text-text opacity-25 mt-3">... and more to come :)</p>
    </div>
</template>