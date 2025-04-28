import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} JSON Viewer</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Github size={16} className="mr-1" />
              <span>Source</span>
            </a>
            <a 
              href="#" 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;