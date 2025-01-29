<script setup>
import { ref, onMounted } from 'vue';
import hiraganaKey from '@/data/hiragana-array';
import InputBox from './InputBox.vue';

const selectedHiragana = ref('');
const selectedRomaji = ref('');

let correctAmount = ref(0);
let incorrectAmount = ref(0);

function generateNewKana() {
    const randomIndex = Math.floor(Math.random() * hiraganaKey.length);
    selectedHiragana.value = hiraganaKey[randomIndex][0];
    selectedRomaji.value = hiraganaKey[randomIndex][1];
};

function correct() {
    generateNewKana()
    correctAmount.value++;
}

function incorrect() {
    incorrectAmount.value++;
}

onMounted(generateNewKana);
</script>

<template>
    <!-- <button @click="generateNewHiragana" class="material-symbols-outlined border-2 rounded-md px-2 py-1 mb-6 hover:bg-accent transition-all duration-250 ease-in-out">shuffle</button> -->
     <div class="flex gap-24 justify-between items-center">
        <p class="opacity-25 p-2">{{ correctAmount }}</p>
        <div class="border-4 border-b-8 border-accent rounded-4xl px-20 py-20 flex justify-center items-center">
            <div class="flex flex-col items-center justify-center">
                <p class="font-NSJ text-9xl font-bold text-accent" id="kana">{{ selectedHiragana }}</p>
                <p class="text-md mt-4 opacity-50 tracking-wide" id="romaji" hidden>{{ selectedRomaji }}</p>
            </div>
        </div>
        <p class="opacity-25 p-2">{{ incorrectAmount }}</p>
     </div>

    <InputBox @correct="correct" @incorrect="incorrect"/>
</template>