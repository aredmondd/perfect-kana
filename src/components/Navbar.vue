<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import themes from '@/data/themes';
import applyTheme from '@/applyTheme';

onMounted(() => {
    applyTheme(localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : themes['mint']);
});

</script>

<template>
    <div class="mt-3 flex mx-12 justify-between items-center">
        <RouterLink to="/about">about</RouterLink>
        <RouterLink to="/"><h1 class="text-accent text-center text-4xl font-gloock font-bold tracking-wide">perfect kana</h1></RouterLink>
        <RouterLink to="/themes">themes</RouterLink>
    </div>
</template>
