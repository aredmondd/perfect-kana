<script setup>
defineProps(['theme']);
</script>

<template>
    <div class="border-2 border-b-4 border-white rounded-2xl p-2 px-6 hover:animate-slide-up" :style="{ backgroundColor : theme.accent }">
        <p class="text-black tracking-wide text-center" :style="{ color: theme.backgroundColor }">{{ theme.name }}</p>
    </div>
</template>