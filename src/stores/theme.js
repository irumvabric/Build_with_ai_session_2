import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'dark');

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }, { immediate: true });

  return { theme, toggleTheme };
});
