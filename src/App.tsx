import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import JSONInput from './components/JSONInput';
import JSONDisplay from './components/JSONDisplay';
import JSONStats from './components/JSONStats';
import ThemeSelector from './components/ThemeSelector';
import { useJSONProcessor } from './hooks/useJSONProcessor';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, setTheme] = useTheme();
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    inputJSON,
    formattedJSON,
    parsedData,
    error,
    isLoading,
    setInputJSON,
    formatInput,
    minifyInput,
    resetInput
  } = useJSONProcessor();
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newRatio = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSplitRatio(Math.min(Math.max(newRatio, 20), 80));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'col-resize';
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = '';
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header themeSelector={<ThemeSelector theme={theme} onChange={setTheme} />} />
      
      <Controls 
        onFormat={formatInput}
        onMinify={minifyInput}
        onReset={resetInput}
      />
      
      <main 
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        <div 
          className="w-full md:w-auto md:flex-none"
          style={{ width: window.innerWidth < 768 ? '100%' : `${splitRatio}%` }}
        >
          <div className="h-[50vh] md:h-full relative">
            <JSONInput onJSONInput={setInputJSON} isLoading={isLoading} />
          </div>
        </div>
        
        {window.innerWidth >= 768 && (
          <div 
            className={`hidden md:block w-1 bg-gray-300 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-indigo-500 cursor-col-resize transition-colors ${isDragging ? 'bg-indigo-400 dark:bg-indigo-500' : ''}`}
            onMouseDown={handleMouseDown}
          />
        )}
        
        <div className="w-full md:w-auto md:flex-1 flex flex-col">
          <div className="h-[50vh] md:h-full flex flex-col">
            <JSONDisplay 
              jsonData={parsedData} 
              jsonString={formattedJSON}
              error={error}
            />
            <JSONStats jsonData={parsedData} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;