<script setup>
import ThemeSelect from '@/components/ThemeSelect.vue'

function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}

</script>

<template>
  <div class="flex flex-col items-start mx-12">
    <h1 class="text-text opacity-75 mb-6 mt-12">themes:</h1>
    <ThemeSelect class="mb-12"/>

    <h1 class="text-text opacity-75 mb-1 mt-6">general settings:</h1>
    <p class="opacity-50">show kana remaining on standard modes</p>
    <p class="opacity-50">show incorrect/correct amount on sides</p>

    <h1 class="text-text opacity-75 mb-1 mt-6">achievements + stats:</h1>
    <p class="opacity-50">coming soon :)</p>
    <!-- total kana practiced, total correct, total inocrrect, percent correct, total lives lost. -->


    <h1 class="text-text opacity-75 mb-3 mt-12">danger zone:</h1>
    <button @click="clearLocalStorage()" class="bg-red-500 border-md text-white px-2 py-1 rounded-md hover:bg-red-700 hover:cursor-pointer transition-colors ease-in-out">Clear my data</button>
  </div>
</template>
