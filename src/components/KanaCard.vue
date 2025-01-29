<script setup>
import hiraganaKey from '@/hiragana-array';
</script>

<template>
    <div class="border-4 border-b-8 border-text rounded-3xl px-20 py-24 flex justify-center items-center">
        <p class="font-NSJ text-9xl font-bold">{{ selectedHiragana }}</p>
    </div>
    <button @click="generateNewHiragana" class="material-symbols-outlined border-2 rounded-md px-2 py-1 mt-6 hover:bg-accent transition-all duration-250 ease-in-out">shuffle</button>
</template>

<script>
export default {
    data() {
        return {
            selectedHiragana: hiraganaKey[Math.floor(Math.random() * hiraganaKey.length)][0]
        }
    },
    methods: {
        generateNewHiragana() {
            this.selectedHiragana = hiraganaKey[Math.floor(Math.random() * hiraganaKey.length)][0];
        }
    }
}
</script>