<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import themes from '@/data/themes';
import applyTheme from '@/applyTheme';
import CommandPallete from './CommandPallete.vue';

onMounted(() => {
    applyTheme(localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : themes['mint']);
});

</script>

<template>
    <div class="mt-3 flex mx-12 justify-between items-center">
        <RouterLink class="hover:text-accent transition-all duration-200 ease-in-out" to="/about">about</RouterLink>
        <RouterLink to="/"><h1 class="text-accent text-center text-4xl font-gloock font-bold tracking-wide">perfect kana</h1></RouterLink>
        <RouterLink class="hover:text-accent transition-all duration-200 ease-in-out" to="/themes">themes</RouterLink>
        <CommandPallete />
    </div>
</template>
