import { useState, useEffect } from 'react';

export type Theme = 'system' | 'light' | 'dark' | 'white' | 'black';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = () => {
      root.classList.remove('theme-light', 'theme-dark', 'theme-white', 'theme-black', 'dark');

      let effectiveTheme: 'light' | 'dark' = 'light';
      
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else if (theme === 'white' || theme === 'light') {
        effectiveTheme = 'light';
      } else {
        effectiveTheme = 'dark';
      }

      root.classList.add(`theme-${theme}`);
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return [theme, setTheme];
};