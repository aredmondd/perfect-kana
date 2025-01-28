<template>
    <div :class="themeClass">
    <div class="mt-16 ml-4">
        <select id="theme-select" v-model="selectedTheme" @change="applyTheme" class="mt-2 p-2 border rounded">
        <option v-for="(theme, index) in themeOptions" :key="index" :value="theme">
            Theme {{ index + 1 }}
        </option>
        </select>
    </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        selectedTheme: 'theme1',
        themes: {
          theme1: {
            background: '#F3F4F6',
            text: '#1F2937',
            accent: '#4CAF50',
          },
          theme2: {
            background: '#1F2937',
            text: '#F3F4F6',
            accent: '#FF5722',
          },
          theme3: {
            background: '#000000',
            text: '#FFFFFF',
            accent: '#00BCD4',
          },
          theme4: {
            background: '#FFEB3B',
            text: '#212121',
            accent: '#673AB7',
          },
          theme5: {
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
      },
    },
    mounted() {
      this.applyTheme();
    },
  };
</script>