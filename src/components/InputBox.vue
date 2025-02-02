<script setup>
    import { ref, defineEmits } from "vue";

    const props = defineProps({
        currentKana: String, currentRomaji: String
    });

    const input = ref('');

    const emit = defineEmits(["correct", "incorrect", "start-timer"]);

    function formSubmit() {
        const text = input.value.trim();

        if (text === props.currentRomaji || text === props.currentKana) {
            setTimeout(() => {
                input.value = '';
                emit("correct");
            }, 150);

        } else {

            setTimeout(() => {
                input.value = '';
                emit("incorrect");
            }, 150);
        }
    };
</script>

<template>
    <form @submit.prevent="formSubmit" id="inputForm">
      <input 
        type="text" 
        id="kanaInput"
        v-model="input"
        size="33"
        class="border-b-1 focus:outline-none mt-12 text-center opacity-50 transition-colors duration-250 text-lg"
        @input="emit('start-timer')"
        autocomplete="off"
        data-1p-ignore
        required
        autofocus
      />
    </form>
  </template>
  