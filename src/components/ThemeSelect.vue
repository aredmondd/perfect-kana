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
    <div class="grid grid-cols-10 gap-4 mx-24">
        <div v-for="theme in themes" :key=theme @click="applyAndCheckTheme(theme)">
            <ThemeCard :theme="theme" :isActiveTheme="localStorageThemeName == theme.name"/>
        </div>
    </div>
</template>