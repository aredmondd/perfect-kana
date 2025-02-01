<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue';
import themes from '@/data/themes';
import applyTheme from '@/applyTheme';
import { eventBus } from '@/eventBus';

let showNavbar = ref(true);

onMounted(() => {
    applyTheme(localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : themes['mint']);
    eventBus.on('toggle-zen', (isZenMode) => {
        showNavbar.value = !isZenMode;
    });
});

onUnmounted(() => {
    eventBus.off('toggle-zen');
});
</script>

<template>
    <div v-if="showNavbar" class="mt-3 flex mx-12 justify-between items-center">
        <RouterLink class="hover:text-accent transition-all duration-200 ease-in-out" to="/about">about</RouterLink>
        <RouterLink to="/"><h1 class="text-accent text-center text-4xl font-gloock font-bold tracking-wide">perfect kana</h1></RouterLink>
        <RouterLink class="hover:text-accent transition-all duration-200 ease-in-out" to="/themes">themes</RouterLink>
    </div>
</template>
