import React, { useState, useRef, useEffect } from 'react';
import { Upload, Clipboard, RefreshCw } from 'lucide-react';
import { getSampleJSON } from './SampleJSON';

interface JSONInputProps {
  onJSONInput: (input: string) => void;
  isLoading: boolean;
}

const JSONInput: React.FC<JSONInputProps> = ({ onJSONInput, isLoading }) => {
  const [inputText, setInputText] = useState<string>(() => {
    const sample = getSampleJSON();
    setTimeout(() => onJSONInput(sample), 0);
    return sample;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      if (lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
      }
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputText(newValue);
    onJSONInput(newValue);
  };
  
  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      onJSONInput(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    setInputText(text);
    onJSONInput(text);
  };
  
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
      onJSONInput(content);
    };
    reader.readAsText(file);
    
    e.target.value = '';
  };
  
  const handleClearClick = () => {
    setInputText('');
    onJSONInput('');
  };

  const lineCount = inputText.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON Input</div>
        <div className="flex space-x-2">
          <button 
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400" 
            onClick={handlePasteClick}
            title="Paste from clipboard"
          >
            <Clipboard size={16} />
          </button>
          <button 
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400" 
            onClick={handleFileUploadClick}
            title="Upload JSON file"
          >
            <Upload size={16} />
          </button>
          <button 
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400" 
            onClick={handleClearClick}
            title="Clear input"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden relative">
        <div 
          ref={lineNumbersRef}
          className="w-12 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 font-mono text-sm p-3 text-right select-none overflow-hidden"
          style={{ whiteSpace: 'pre-line' }}
        >
          {lineNumbers}
        </div>
        <textarea 
          ref={textareaRef}
          className="flex-1 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-300"
          value={inputText}
          onChange={handleTextChange}
          onPaste={handlePaste}
          placeholder="Paste your JSON here or upload a file..."
          spellCheck="false"
        />
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".json,application/json" 
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center pointer-events-none">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default JSONInput;