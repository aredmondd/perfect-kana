<script setup>
import { ref, onMounted } from 'vue';
import hiraganaData from '@/data/hiragana';
import katakanaData from '@/data/katakana';

import InputBox from './InputBox.vue';
import Timer from '@/components/Timer.vue';

// if the user has never been to the site assume they wants basic basic hiragana
let mode = ref('hiragana');
let mutations = ref({
    threeLives: false,
    infinite: false,
    showRomaji: false,
    timer: false,
    dakuten: false,
    hanDakuten: false,
});

// the current array that the user will loop over/through, and the current 
let practiceArray = hiraganaData.hiraganaKey;
let selectedKana = ref('');
let selectedRomaji = ref('');

// track the amount incorrect/correct
let correctAmount = ref(0);
let incorrectAmount = ref(0);

// track where we are in non-infinite modes
let currentKanaIndex = ref(0);

const timerRef = ref(null);

function startTimer() {
    if (mutations.value.timer && timerRef.value) {
        timerRef.value.start(); // Calls start() on Timer when user types
    }
}

// generate a new Kana if in infinite mode
function generateNewRandomKana() {
    const randomIndex = Math.floor(Math.random() * practiceArray.length);
    selectedKana.value = practiceArray[randomIndex][0];
    selectedRomaji.value = practiceArray[randomIndex][1];
};

// iterate to the next kana on regular modes
function nextKana() {
    if (mutations.value.infinite) {
        generateNewRandomKana();
        return;
    }
    selectedKana.value = practiceArray[currentKanaIndex.value][0];
    selectedRomaji.value = practiceArray[currentKanaIndex.value][1];
    currentKanaIndex.value++;
}

// go to the next kana if the gaame isn't over
function correct() {
    if (currentKanaIndex.value == practiceArray.length) {
        alert('you are done. congrats!');
        currentKanaIndex.value = 0;
        selectMode(mode.value);
    }
    else {
        nextKana();
        correctAmount.value++;
    }
}

// take off lives or add one to the incorrect counter
function incorrect() {
    incorrectAmount.value++;

    if (mutations.value.threeLives == true) {
        if (incorrectAmount.value == 3) {
            document.getElementById("heart-1").innerText = "♡";
            alert('game over (sad)');
        }
        else if (incorrectAmount.value == 2) {
            document.getElementById("heart-2").innerText = "♡";
        }
        else if (incorrectAmount.value == 1) {
            document.getElementById("heart-3").innerText = "♡";
        }
    }
}

function selectMode(newMode) {
    mode.value = newMode;

    correctAmount.value = 0;
    incorrectAmount.value = 0;

    if (mode.value === 'hiragana') {
        localStorage.setItem('mode', 'hiragana');
        practiceArray = shuffle(hiraganaData.hiraganaKey);
    }
    else if (mode.value === 'katakana') {
        localStorage.setItem('mode', 'katakana');
        practiceArray = shuffle(katakanaData.katakanaKey);
    }
    else if (mode.value === 'both') {
        localStorage.setItem('mode', 'both');
        practiceArray = shuffle(hiraganaData.hiraganaKey.concat(katakanaData.katakanaKey));
    }

    nextKana();
}

function selectMutation(newMutation) {
    correctAmount.value = 0;
    incorrectAmount.value = 0;

    if (newMutation === '3 lives') {
        mutations.value.threeLives = !mutations.value.threeLives;
    }
    else if (newMutation === 'infinite') {
        mutations.value.infinite = !mutations.value.infinite;
    }
    else if (newMutation === 'show romaji') {
        mutations.value.showRomaji = !mutations.value.showRomaji;
    }
    else if (newMutation === 'timer') {
        mutations.value.timer = !mutations.value.timer;
    }
    else if (newMutation === 'dakuten') {
        mutations.value.dakuten = !mutations.value.dakuten;
        if (mutations.value.dakuten && mutations.value.hanDakuten) {
            practiceArray = hiraganaData.hiraganaKey.concat(hiraganaData.hiraganaKeyWithDakuten).concat(hiraganaData.hiraganaKeyWithHandakuten);
        }
        else if (mutations.value.dakuten) {
            practiceArray = hiraganaData.hiraganaKey.concat(hiraganaData.hiraganaKeyWithDakuten);
        }
        else {
            practiceArray = hiraganaData.hiraganaKey;
        }
    }
    else if (newMutation === 'hanDakuten') {
        mutations.value.hanDakuten = !mutations.value.hanDakuten;
        if (mutations.value.dakuten && mutations.value.hanDakuten) {
            practiceArray = hiraganaData.hiraganaKey.concat(hiraganaData.hiraganaKeyWithDakuten).concat(hiraganaData.hiraganaKeyWithHandakuten);
        }
        else if (mutations.value.hanDakuten) {
            practiceArray = hiraganaData.hiraganaKey.concat(hiraganaData.hiraganaKeyWithHandakuten);
        }
        else {
            practiceArray = hiraganaData.hiraganaKey;
        }
    }

    localStorage.setItem('mode', mode.value);
    practiceArray = shuffle(practiceArray);
    nextKana();
}

function shuffle(array) {
    let currentIndex = array.length
    
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

onMounted(() => {
    selectMode(localStorage.getItem('mode'));
});
</script>

<template>
    <div class="flex gap-24 justify-between items-center" style="min-width: 300px;">
        <p class="opacity-25 p-2 text-right" style="min-width: 40px;">{{ correctAmount }}</p>
        <div class="flex flex-col gap-6">
            <div v-if="mutations.timer" class="text-center">
                <Timer ref="timerRef"/>
            </div>
            <div v-if="mutations.threeLives" class="flex items-center justify-center gap-2 opacity-50 text-center text-3xl">
                <p id="heart-1">❤︎</p>
                <p id="heart-2">❤︎</p>
                <p id="heart-3">❤︎</p>
            </div>
            <p v-if="!mutations.infinite" class="opacity-50 text-center">kana remaining: {{ practiceArray.length - correctAmount }}</p>
            <div class="border-4 border-b-8 border-accent rounded-4xl px-20 py-20 flex justify-center items-center">
                <div class="flex flex-col items-center justify-center">
                    <p class="font-NSJ text-9xl font-bold text-accent" id="kana">{{ selectedKana }}</p>
                    <p v-if="mutations.showRomaji" class="text-md mt-4 opacity-50 tracking-wide" id="romaji">{{ selectedRomaji }}</p>
                </div>
            </div>
        </div>
        <p class="opacity-25 p-2 text-right" style="min-width: 40px;">{{ incorrectAmount }}</p>
    </div>

    <InputBox @start-timer="startTimer" @correct="correct" @incorrect="incorrect" :currentKana="selectedKana" :currentRomaji="selectedRomaji"/>

    <div class="grid grid-cols-3 gap-4 text-center mt-6">
        <div :class="[mode === 'hiragana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('hiragana')">hiragana</div>
        <div :class="[mode === 'katakana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('katakana')">katakana</div>
        <div :class="[mode === 'both' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('both')">both</div>
        <div :class="[mutations.threeLives ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('3 lives')">3 lives</div>
        <div :class="[mutations.infinite ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('infinite')">infinite</div>
        <div :class="[mutations.showRomaji ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('show romaji')">show romaji</div>
        <div :class="[mutations.timer ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('timer')">timer</div>
        <div :class="[mutations.dakuten ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('dakuten')">dakuten</div>
        <div :class="[mutations.hanDakuten ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('hanDakuten')">han-dakuten</div>
    </div>
</template>