<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import siteThemes from '@/themes'
</script>

<template>
    <header>
        <div class="wrapper">
            <Navbar/>
        </div>
    </header>
    <RouterView />
</template>

<script>
  export default {
    data() {
      return {
        selectedTheme: JSON.parse(localStorage.getItem('theme')) ? JSON.parse(localStorage.getItem('theme')).name : 'mint',
        themes: siteThemes,
      };
    },
    methods: {
      applyTheme() {
        document.documentElement.style.setProperty('--background-color', this.themes[this.selectedTheme].background);
        document.documentElement.style.setProperty('--text-color', this.themes[this.selectedTheme].text);
        document.documentElement.style.setProperty('--accent-color', this.themes[this.selectedTheme].accent);

        localStorage.setItem('theme', JSON.stringify(this.themes[this.selectedTheme]));
      },
    },
    mounted() {
      this.applyTheme();
    },
  };
</script>
