<template>
    <div :class="themeClass">
    <div class="mt-16 ml-4">
        <select id="theme-select" v-model="selectedTheme" @change="applyTheme" class="mt-2 p-2 border rounded">
        <option v-for="(theme, index) in themeOptions" :key="index" :value="theme">
            {{ theme }}
        </option>
        </select>
    </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        selectedTheme: JSON.parse(localStorage.getItem('theme')) ? JSON.parse(localStorage.getItem('theme')).name : 'mint',
        themes: {
          mint: {
            name: 'mint',
            background: '#F3F4F6',
            text: '#1F2937',
            accent: '#4CAF50',
          },
          freedom: {
            name: 'freedom',
            background: '#1F2937',
            text: '#F3F4F6',
            accent: '#FF5722',
          },
          icy: {
            name: 'icy',
            background: '#000000',
            text: '#FFFFFF',
            accent: '#00BCD4',
          },
          blurry: {
            name: 'blurry',
            background: '#FFEB3B',
            text: '#212121',
            accent: '#673AB7',
          },
          popsicle: {
            name: 'popsicle',
            background: '#E91E63',
            text: '#FFFFFF',
            accent: '#3F51B5',
          },
        },
      };
    },
    computed: {
      themeOptions() {
        return Object.keys(this.themes);
      },
      themeClass() {
        const theme = this.themes[this.selectedTheme];
        return {
          'bg-[theme.background]': true,
          'text-[theme.text]': true,
          'accent-[theme.accent]': true,
        };
      },
    },
    methods: {
      applyTheme() {
        document.documentElement.style.setProperty('--background-color', this.themes[this.selectedTheme].background);
        document.documentElement.style.setProperty('--text-color', this.themes[this.selectedTheme].text);
        document.documentElement.style.setProperty('--accent-color', this.themes[this.selectedTheme].accent);

        localStorage.setItem('theme', JSON.stringify(this.themes[this.selectedTheme]));
        let currentTheme = JSON.parse(localStorage.getItem('theme'));
        console.log(currentTheme.name);
      },
    },
    mounted() {
      this.applyTheme();
    },
  };
</script>