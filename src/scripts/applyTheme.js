import themes from "@/data/themes";

function applyTheme(theme) {
    document.documentElement.style.setProperty('--background-color', themes[theme.name].background);
    document.documentElement.style.setProperty('--text-color', themes[theme.name].text);
    document.documentElement.style.setProperty('--accent-color', themes[theme.name].accent);

    localStorage.setItem('theme', JSON.stringify(themes[theme.name]));
}

export default applyTheme;