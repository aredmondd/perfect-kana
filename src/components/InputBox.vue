<script setup>
    import { ref, defineEmits } from "vue";

    const name = ref('');
    const borderClass = ref('border-text bg-transparent bg-opacity-100');
    const emit = defineEmits(["generate-new-kana"]);

    function formSubmit() {
        const romaji = name.value.trim();

        let currentRomaji = document.getElementById("romaji").innerText

        borderClass.value = romaji === currentRomaji ? 'border-success text-success' : 'border-failure text-failure';

        setTimeout(() => {
            borderClass.value = "border-text text-text";
            name.value = '';
            emit("generate-new-kana");
        }, 350);
    };
</script>

<template>
    <form @submit.prevent="formSubmit" id="inputForm">
      <input 
        type="text" 
        id="kanaInput"
        v-model="name"
        size="10"
        class="border-1 rounded-lg focus:outline-none mt-6 text-center opacity-50 transition-colors duration-250"
        :class="borderClass"
        autocomplete="off"
        style="caret-color: transparent;"
        data-1p-ignore
        required
        autofocus
      />
    </form>
  </template>
  