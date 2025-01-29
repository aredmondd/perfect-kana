<script setup>
    import { ref, defineEmits } from "vue";

    const name = ref('');
    const borderClass = ref('border-text bg-transparent bg-opacity-100');
    const emit = defineEmits(["generate-new-kana"]);

    function formSubmit() {
        const text = name.value.trim();

        let currentRomaji = document.getElementById("romaji").innerText;
        let currentKana = document.getElementById("kana").innerText;

        if (text === currentRomaji || text === currentKana) {
            borderClass.value = 'border-success text-success';
            setTimeout(() => {
                borderClass.value = "border-text text-text";
                name.value = '';
                emit("generate-new-kana");
            }, 150);

        } else {
            borderClass.value = 'border-failure text-failure';

            setTimeout(() => {
                borderClass.value = "border-text text-text";
                name.value = '';
            }, 150);
        }
    };
</script>

<template>
    <form @submit.prevent="formSubmit" id="inputForm">
      <input 
        type="text" 
        id="kanaInput"
        v-model="name"
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
  