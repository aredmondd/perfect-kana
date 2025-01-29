<script setup>
import { RouterLink, RouterView } from 'vue-router'
import applyTheme from '../../applyTheme';
import { onMounted } from 'vue';

onMounted(() => {
    applyTheme(JSON.parse(localStorage.getItem("theme")));
});

</script>

<template>
    <div class="mt-3 flex mx-12 justify-between items-center">
        <RouterLink to="/">Home</RouterLink>
        <h1 class="text-accent text-center text-4xl font-gloock font-bold tracking-wide">perfect kana</h1>
        <RouterLink to="/about">About</RouterLink>
    </div>
</template>
