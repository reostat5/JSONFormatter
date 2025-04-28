import React, { useState, useRef, useEffect } from 'react';
import JSONNode from './JSONNode';
import { Copy, Minimize, Maximize } from 'lucide-react';

interface JSONDisplayProps {
  jsonData: any;
  jsonString: string;
  error: string | null;
}

const JSONDisplay: React.FC<JSONDisplayProps> = ({ jsonData, jsonString, error }) => {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const contentRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const content = contentRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!content || !lineNumbers) return;

    const handleScroll = () => {
      if (lineNumbers) {
        lineNumbers.scrollTop = content.scrollTop;
      }
    };

    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePathClick = (path: string) => {
    setCurrentPath(path);
  };
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const lineCount = (jsonString || '').split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  
  if (error) {
    return (
      <div className="flex-1 bg-red-50 dark:bg-red-900/20 p-4 overflow-auto">
        <div className="text-red-600 dark:text-red-400 font-medium mb-2">Error Parsing JSON:</div>
        <pre className="font-mono text-sm text-red-500 dark:text-red-300 whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    );
  }
  
  if (!jsonData) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="mb-2 text-lg">No JSON data to display</p>
          <p className="text-sm">Paste some JSON in the input area or upload a file</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'flex-1'}`}>
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentPath ? (
            <span>
              Path: <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">{currentPath}</code>
            </span>
          ) : (
            'JSON View'
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            className={`p-1.5 rounded transition-colors ${copied ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            onClick={handleCopy}
            title="Copy JSON"
          >
            <Copy size={16} />
          </button>
          <button 
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400" 
            onClick={toggleFullScreen}
            title={isFullScreen ? "Exit full screen" : "Full screen"}
          >
            {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden bg-white dark:bg-gray-900">
        <div 
          ref={lineNumbersRef}
          className="w-12 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 font-mono text-sm p-3 text-right select-none overflow-hidden"
          style={{ whiteSpace: 'pre-line' }}
        >
          {lineNumbers}
        </div>
        <pre 
          ref={contentRef}
          className="flex-1 p-3 overflow-auto"
        >
          {typeof jsonData === 'object' && jsonData !== null ? (
            <JSONNode
              name={null}
              value={jsonData}
              isLast={true}
              level={0}
              path=""
              onPathClick={handlePathClick}
            />
          ) : (
            <div className="font-mono text-sm">
              <span className={jsonData === null ? 'text-gray-500' : typeof jsonData === 'string' ? 'text-green-600' : 'text-blue-600'}>
                {jsonData === null ? 'null' : JSON.stringify(jsonData)}
              </span>
            </div>
          )}
        </pre>
      </div>
    </div>
  );
};

export default JSONDisplay;