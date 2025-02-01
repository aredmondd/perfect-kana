<!-- credit to https://www.educative.io/answers/how-to-create-a-stopwatch-in-javascript and chatGPT for help with this  -->
<script setup>
import { ref } from 'vue';

let startTime;
let stopwatchInterval;
let elapsedPausedTime = 0;
const displayTime = ref("0.00");

function start() {
    if (!stopwatchInterval) {
        startTime = performance.now() - elapsedPausedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms
    }
}

function stop() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedPausedTime = 0;
    displayTime.value = "0.00";
  }
}

function updateStopwatch() {
    let elapsedTime = performance.now() - startTime;
    
    let milliseconds = (elapsedTime % 1000) / 10; // Convert to two decimal places
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    milliseconds = milliseconds.toFixed(0).padStart(2, "0"); // Two decimal places
    
    if (hours > 0) {
        displayTime.value = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
    } else if (minutes > 0) {
        displayTime.value = `${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
    } else {
        displayTime.value = `${seconds}.${milliseconds}`;
    }
}

function pad(number) {
    return number.toString().padStart(2, "0"); // Ensures two-digit formatting
}

defineExpose({ start, stop });
</script>

<template>
    <p id="stopwatch" style="font-family: monospace; font-size: 2rem;">{{ displayTime }}</p>
</template>