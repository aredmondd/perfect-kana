<script setup>
import ThemeSelect from '@/components/ThemeSelect.vue';
import { ref, watch } from 'vue';
import { eventBus } from '@/eventBus';

let showKanaRemaining = ref(JSON.parse(localStorage.getItem("showKanaRemaining")) ?? true);
let showAmountCompleted = ref(JSON.parse(localStorage.getItem("showAmountCompleted")) ?? true);

watch(showKanaRemaining, (newValue) => {
    localStorage.setItem("showKanaRemaining", newValue);
});

watch(showAmountCompleted, (newValue) => {
    localStorage.setItem("showAmountCompleted", newValue);
});

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
        <form class="flex gap-12">
            <div class="flex gap-2">
                <input type="checkbox" id="kana_remaining" v-model="showKanaRemaining">
                <label for="kana_remaining">Show kana remaining on standard modes</label>
            </div>
            <div class="flex gap-2">
                <input type="checkbox" id="amount" v-model="showAmountCompleted">
                <label for="amount">Show incorrect/correct amount on sides</label>
            </div>
        </form>

        <h1 class="text-text opacity-75 mb-3 mt-12">danger zone:</h1>
        <button @click="clearLocalStorage" class="bg-red-500 border-md text-white px-2 py-1 rounded-md hover:bg-red-700">
        Clear my data
        </button>
    </div>
</template>
