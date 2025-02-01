<script setup>
import { ref, onMounted } from 'vue';
import hiraganaData from '@/data/hiragana';
import katakanaData from '@/data/katakana';
import { eventBus } from '@/eventBus';

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
let zen = ref(false);

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
        timerRef.value.start();
    }
}

function stopTimer() {
    if (timerRef.value) {
        timerRef.value.stop();
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
}

// go to the next kana if the gaame isn't over
function correct() {
    if (currentKanaIndex.value >= practiceArray.length - 1) {
        correctAmount.value++;
        setTimeout(() => {
            alert('you are done. congrats!');
            currentKanaIndex.value = 0;
            selectMode(mode.value);
        }, 100)
    } else {
        correctAmount.value++;
        currentKanaIndex.value++;
        nextKana();
    }
}

// take off lives or add one to the incorrect counter
function incorrect() {
    incorrectAmount.value++;

    if (mutations.value.threeLives == true) {
        if (incorrectAmount.value == 3) {
            document.getElementById("heart-1").innerText = "♡";
            setTimeout(() => {
                alert('game over (sad)');
                document.getElementById("heart-1").innerText = "❤︎";
                document.getElementById("heart-2").innerText = "❤︎";
                document.getElementById("heart-3").innerText = "❤︎";
                selectMode(mode.value);
            }, 1000);
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
    stopTimer();
    mode.value = newMode;

    correctAmount.value = 0;
    incorrectAmount.value = 0;

    currentKanaIndex.value = 0;

    if (mode.value === 'hiragana') {
        localStorage.setItem('mode', 'hiragana');
        updatePracticeArray();
    }
    else if (mode.value === 'katakana') {
        localStorage.setItem('mode', 'katakana');
        updatePracticeArray();
    }
    else if (mode.value === 'both') {
        localStorage.setItem('mode', 'both');
        updatePracticeArray();
    }

    nextKana();
}

function selectMutation(newMutation) {
    stopTimer();
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
        updatePracticeArray();
    }
    else if (newMutation === 'hanDakuten') {
        mutations.value.hanDakuten = !mutations.value.hanDakuten;
        updatePracticeArray();
    }

    localStorage.setItem('mode', mode.value);
    practiceArray = shuffle(practiceArray);
    currentKanaIndex.value = 0;
    nextKana();
}

// shuffle an array (is 2d in this case)
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

function updatePracticeArray() {
  let arrays = [];

    if (mode.value === 'hiragana') {
        arrays.push(hiraganaData.hiraganaKey);
        if (mutations.value.dakuten) {
            arrays.push(hiraganaData.dakuten);
        }
        if (mutations.value.hanDakuten) {
            arrays.push(hiraganaData.handakuten);
        }
    } else if (mode.value === 'katakana') {
        arrays.push(katakanaData.katakanaKey);
        if (mutations.value.dakuten) {
            arrays.push(katakanaData.dakuten);
        }
        if (mutations.value.hanDakuten) {
            arrays.push(katakanaData.handakuten);
        }
    } else if (mode.value === 'both') {
        arrays.push(katakanaData.katakanaKey);
        arrays.push(hiraganaData.hiraganaKey);
        if (mutations.value.dakuten) {
            arrays.push(katakanaData.dakuten);
            arrays.push(hiraganaData.dakuten);
        }
        if (mutations.value.hanDakuten) {
            arrays.push(katakanaData.handakuten);
            arrays.push(hiraganaData.handakuten);
        }
    }

  practiceArray = [].concat(...arrays);
}

function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        zen.value = !zen.value;
        eventBus.emit('toggle-zen', zen.value);
    }
}


onMounted(() => {
    selectMode(localStorage.getItem('mode') ? localStorage.getItem('mode') : 'hiragana');
    window.addEventListener('keydown', handleKeyDown);
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

    <!-- <div class="grid grid-cols-3 gap-4 text-center mt-6">
        <div :class="[mode === 'hiragana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('hiragana')">hiragana</div>
        <div :class="[mode === 'katakana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('katakana')">katakana</div>
        <div :class="[mode === 'both' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('both')">both</div>
        <div :class="[mutations.threeLives ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('3 lives')">3 lives</div>
        <div :class="[mutations.infinite ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('infinite')">infinite</div>
        <div :class="[mutations.showRomaji ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('show romaji')">show romaji</div>
        <div :class="[mutations.timer ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('timer')">timer</div>
        <div :class="[mutations.dakuten ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('dakuten')">dakuten</div>
        <div :class="[mutations.hanDakuten ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMutation('hanDakuten')">han-dakuten</div>
    </div> -->

    <div v-if="!zen" class="flex gap-6 mt-10 rounded-md px-6 py-1">
        <div :class="[mode === 'hiragana' ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('hiragana')">hiragana</div>
        <div :class="[mode === 'katakana' ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('katakana')">katakana</div>
        <div :class="[mode === 'both' ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out" @click="selectMode('both')">both</div>
    </div>

    <div v-if="!zen" class="flex gap-6 mt-2 rounded-md px-6 py-1">
        <div :class="[mutations.threeLives ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('3 lives')">3 lives</div>
        <div :class="[mutations.infinite ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('infinite')">infinite</div>
        <div :class="[mutations.showRomaji ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('show romaji')">show romaji</div>
        <div :class="[mutations.timer ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('timer')">timer</div>
        <div :class="[mutations.dakuten ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('dakuten')">dakuten</div>
        <div :class="[mutations.hanDakuten ? 'text-accent opacity-100 font-bold' : '']" class="opacity-50 hover:text-accent hover:opacity-100 hover:cursor-pointer transition-all duration-200 ease-in-out consistent-font" @click="selectMutation('hanDakuten')">han-dakuten</div>
    </div>

    <p v-if="!zen" :class="correctAmount < 1 ? 'opacity-25' : 'opacity-0' " class="mt-12">press <span class="bg-text/25 text-bg px-1 rounded-md">cmd</span> + <span class="bg-text/25 text-bg px-1 rounded-md">h</span> to enter/exit zen mode</p>
</template>
