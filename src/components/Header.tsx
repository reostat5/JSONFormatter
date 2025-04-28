import React from 'react';
import { FileJson, Users } from 'lucide-react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';

interface HeaderProps {
  themeSelector: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ themeSelector }) => {
  const visitorCount = useVisitorCounter();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileJson size={28} className="text-white" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">JSON Viewer</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
            <Users size={16} />
            <span className="text-sm font-medium">{visitorCount} this week</span>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="#" className="hover:text-indigo-200 transition-colors px-2 py-1">
              Help
            </a>
            <a href="#" className="hover:text-indigo-200 transition-colors px-2 py-1">
              About
            </a>
          </div>
          {themeSelector}
        </div>
      </div>
    </header>
  );
};

export default Header;