<script setup>
import { ref, onMounted} from 'vue';
import ThemeCard from './ThemeCard.vue';
import themes from '../data/themes';
import applyTheme from '../scripts/applyTheme';

</script>

<template>
    <div class="grid grid-cols-10 gap-4 mx-24">
        <div v-for="theme in themes" :key=theme @click="applyTheme(theme)">
            <ThemeCard :theme="theme"/>
        </div>
    </div>
</template>