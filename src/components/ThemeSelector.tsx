import React from 'react';
import { Monitor, Sun, Moon, Circle, CircleDot } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ThemeSelectorProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onChange }) => {
  return (
    <div className="relative group">
      <button 
        className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white"
        title="Change theme"
      >
        {theme === 'system' && <Monitor size={20} />}
        {theme === 'light' && <Sun size={20} />}
        {theme === 'dark' && <Moon size={20} />}
        {theme === 'white' && <Circle size={20} />}
        {theme === 'black' && <CircleDot size={20} />}
      </button>
      
      <div className="absolute right-0 mt-1 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
        <button
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          onClick={() => onChange('system')}
        >
          <Monitor size={16} className="text-gray-600 dark:text-gray-400" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>}
        </button>
        <button
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          onClick={() => onChange('light')}
        >
          <Sun size={16} className="text-gray-600 dark:text-gray-400" />
          <span>Light</span>
          {theme === 'light' && <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>}
        </button>
        <button
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          onClick={() => onChange('dark')}
        >
          <Moon size={16} className="text-gray-600 dark:text-gray-400" />
          <span>Dark</span>
          {theme === 'dark' && <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>}
        </button>
        <button
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          onClick={() => onChange('white')}
        >
          <Circle size={16} className="text-gray-600 dark:text-gray-400" />
          <span>White</span>
          {theme === 'white' && <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>}
        </button>
        <button
          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          onClick={() => onChange('black')}
        >
          <CircleDot size={16} className="text-gray-600 dark:text-gray-400" />
          <span>Black</span>
          {theme === 'black' && <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>}
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;