<script setup>
import { ref, onMounted} from 'vue';
import ThemeCard from './ThemeCard.vue';
import themes from '../data/themes';
import applyTheme from '@/applyTheme';

let localStorageThemeName = ref(JSON.parse(localStorage.getItem("theme")).name)

function applyAndCheckTheme(theme) {
    applyTheme(theme);
    localStorageThemeName.value = JSON.parse(localStorage.getItem("theme")).name;
}

</script>

<template>
    <div class="flex flex-wrap gap-4">
        <div v-for="theme in themes" :key=theme @click="applyAndCheckTheme(theme)" class="min-w-[100px]">
            <ThemeCard :theme="theme" :isActiveTheme="localStorageThemeName == theme.name"/>
        </div>
        <p class="text-text opacity-25 mt-3">... and more to come :)</p>
    </div>
</template>