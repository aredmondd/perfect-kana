<script setup>
import ThemeSelect from '@/components/ThemeSelect.vue'

function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}

</script>

<template>
  <div class="flex flex-col items-start mx-12">
    <h1 class="text-text opacity-50 mb-6 mt-12">themes:</h1>
    <ThemeSelect />
    <h1 class="text-text opacity-50 mb-6 mt-12">danger zone:</h1>
    <button @click="clearLocalStorage()" class="bg-red-500 border-md text-white px-2 py-1 rounded-md hover:bg-red-700 hover:cursor-pointer transition-colors ease-in-out">Clear my data</button>
  </div>
</template>
