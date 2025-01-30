<script setup>
import { ref, onMounted } from 'vue';
import hiraganaKey from '@/data/hiragana-array';
import katakanaKey from '@/data/katakana-array';
import InputBox from './InputBox.vue';

let mode = ref('hiragana');
let mutations = ref({
    threeLives: false,
    infinite: false,
    showRomaji: false,
    timer: false,
});

let practiceArray = hiraganaKey;
let selectedHiragana = ref('');
let selectedRomaji = ref('');

let correctAmount = ref(0);
let incorrectAmount = ref(0);

let currentKanaIndex = ref(0);

function generateNewKana() {
    const randomIndex = Math.floor(Math.random() * practiceArray.length);
    selectedHiragana.value = practiceArray[randomIndex][0];
    selectedRomaji.value = practiceArray[randomIndex][1];
};

function nextKana() {
    selectedHiragana.value = practiceArray[currentKanaIndex.value][0];
    selectedRomaji.value = practiceArray[currentKanaIndex.value][1];
    currentKanaIndex.value++;
}

function correct() {
    nextKana();
    correctAmount.value++;

}

function incorrect() {
    incorrectAmount.value++;
}

function selectMode(newMode) {
    mode.value = newMode;

    correctAmount.value = 0;
    incorrectAmount.value = 0;

    if (mode.value === 'hiragana') {
        localStorage.setItem('mode', 'hiragana');
        practiceArray = shuffle(hiraganaKey);
        nextKana();
    }
    else if (mode.value === 'katakana') {
        localStorage.setItem('mode', 'katakana');
        practiceArray = shuffle(katakanaKey);
        nextKana();
    }
    else if (mode.value === 'both') {
        localStorage.setItem('mode', 'both');
        practiceArray = shuffle(hiraganaKey.concat(katakanaKey));
        nextKana();
    }
}

function selectMutation(newMutation) {
    if (newMutation === '3 lives') {
        mutations.value.threeLives = !mutations.value.threeLives;
        // show the 3 lives
    }
    else if (newMutation === 'infinite') {
        mutations.value.infinite = !mutations.value.infinite;
        // shuffle the array like old generateNewKana()
    }
    else if (newMutation === 'show romaji') {
        mutations.value.showRomaji = !mutations.value.showRomaji;
        // shuffle the array like old generateNewKana()
    }
    else if (newMutation === 'timer') {
        mutations.value.timer = !mutations.value.timer;
        // shuffle the array like old generateNewKana()
    }
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
}
);
</script>

<template>
     <div class="flex gap-24 justify-between items-center">
        <p class="opacity-25 p-2 text-right">{{ correctAmount }}</p>
        <div class="flex flex-col gap-6">
            <p v-if="mutations.timer" class="opacity-50 text-center">0.00</p>
            <div v-if="mutations.threeLives" class="flex items-center justify-center gap-2 opacity-50 text-center text-3xl">
                <p>❤︎</p> <!--♡-->
                <p>❤︎</p>
                <p>❤︎</p>
            </div>
            <p v-if="!mutations.infinite" class="opacity-50 text-center">kana remaining: {{ practiceArray.length - correctAmount }}</p>
            <div class="border-4 border-b-8 border-accent rounded-4xl px-20 py-20 flex justify-center items-center">
                <div class="flex flex-col items-center justify-center">
                    <p class="font-NSJ text-9xl font-bold text-accent" id="kana">{{ selectedHiragana }}</p>
                    <p v-if="mutations.showRomaji" class="text-md mt-4 opacity-50 tracking-wide" id="romaji">{{ selectedRomaji }}</p>
                </div>
            </div>
        </div>
        <p class="opacity-25 p-2 text-right">{{ incorrectAmount }}</p>
     </div>

    <InputBox @correct="correct" @incorrect="incorrect" :currentHiragana="selectedHiragana" :currentRomaji="selectedRomaji"/>

    <div class="grid grid-cols-3 gap-4 text-center mt-6">
        <div :class="[mode === 'hiragana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMode('hiragana')">hiragana</div>
        <div :class="[mode === 'katakana' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMode('katakana')">katakana</div>
        <div :class="[mode === 'both' ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMode('both')">both</div>
    </div>

    <div class="flex gap-4 text-center mt-4">
        <div :class="[mutations.threeLives ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMutation('3 lives')">3 lives</div>
        <div :class="[mutations.infinite ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMutation('infinite')">infinite</div>
        <div :class="[mutations.showRomaji ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMutation('show romaji')">show romaji</div>
        <div :class="[mutations.timer ? 'text-accent opacity-100' : '']" class="opacity-50 border-1 px-4 py-1 rounded-xl hover:text-accent hover:opacity-100 hover:cursor-pointer" @click="selectMutation('timer')">timer</div>
    </div>
</template>