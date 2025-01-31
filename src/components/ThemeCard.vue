<script setup>
const props = defineProps(['theme', 'isActiveTheme']);
</script>

<template>
    <div :class=" props.isActiveTheme ? 'outline-4 shadow-2xl' : ''" class="rounded-xl p-2 hover:animate-slide-up" :style="{ backgroundColor : theme.background, outlineColor: theme.accent }">
        <p class="tracking-wide text-center" :style="{ color: theme.accent }">{{ theme.name }}</p>
    </div>
</template>