import React from 'react';
import { 
  AlignJustify, 
  AlignLeft, 
  Moon, 
  Sun,
  Share,
  Undo
} from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ControlsProps {
  onFormat: () => void;
  onMinify: () => void;
  onReset: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  onFormat, 
  onMinify, 
  onReset,
  theme,
  onThemeChange
}) => {
  const isDarkMode = theme === 'dark' || theme === 'black' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          className="flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400 rounded transition-colors text-sm font-medium"
          onClick={onFormat}
        >
          <AlignJustify size={16} className="mr-1.5" />
          Format
        </button>
        
        <button
          className="flex items-center px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded transition-colors text-sm font-medium"
          onClick={onMinify}
        >
          <AlignLeft size={16} className="mr-1.5" />
          Minify
        </button>
        
        <button
          className="flex items-center px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded transition-colors text-sm font-medium"
          onClick={onReset}
        >
          <Undo size={16} className="mr-1.5" />
          Reset
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="flex items-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
          onClick={() => onThemeChange(isDarkMode ? 'light' : 'dark')}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="flex items-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
          title="Share JSON"
        >
          <Share size={20} />
        </button>
      </div>
    </div>
  );
};

export default Controls;