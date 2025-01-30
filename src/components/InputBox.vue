<script setup>
    import { ref, defineEmits } from "vue";

    const props = defineProps({
        currentHiragana: String, currentRomaji: String
    });

    const input = ref('');
    const borderClass = ref('border-text bg-transparent bg-opacity-100');

    const emit = defineEmits(["correct", "incorrect"]);

    function formSubmit() {
        const text = input.value.trim();

        if (text === props.currentRomaji || text === props.currentKana) {
            borderClass.value = 'border-success text-success';
            setTimeout(() => {
                borderClass.value = "border-text text-text";
                input.value = '';
                emit("correct");
            }, 150);

        } else {
            borderClass.value = 'border-failure text-failure';

            setTimeout(() => {
                borderClass.value = "border-text text-text";
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
        class="border-b-1 focus:outline-none mt-12 text-center opacity-50 transition-colors duration-250"
        :class="borderClass"
        autocomplete="off"
        style="caret-color: transparent;"
        data-1p-ignore
        required
        autofocus
      />
    </form>
  </template>
  