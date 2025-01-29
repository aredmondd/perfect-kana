<script setup>
import { ref, onMounted} from 'vue';
import ThemeCard from './ThemeCard.vue';
import themes from '../data/themes';
import applyTheme from '../scripts/applyTheme';

let currentTheme = localStorage.getItem("theme");

</script>

<template>
    <div class="mt-16 flex gap-4">
        <div v-for="theme in themes" :key=theme @click="applyTheme(theme)">
            <ThemeCard :theme="theme"/>
        </div>
    </div>
</template>