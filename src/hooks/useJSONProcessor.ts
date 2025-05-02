import { useState, useEffect, useCallback, useRef } from 'react';

interface JSONProcessorResult {
  inputJSON: string;
  formattedJSON: string;
  parsedData: any;
  error: string | null;
  isLoading: boolean;
  setInputJSON: (input: string) => void;
  formatInput: () => void;
  minifyInput: () => void;
  resetInput: () => void;
}

export const useJSONProcessor = (initialValue: string = ''): JSONProcessorResult => {
  const [inputJSON, setInputJSON] = useState<string>(initialValue);
  const [formattedJSON, setFormattedJSON] = useState<string>('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const workerRef = useRef<Worker | null>(null);

  // Initialize worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/jsonWorker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { success, data, error } = e.data;
      setIsLoading(false);

      if (success) {
        setError(null);
        setParsedData(data);
        setFormattedJSON(JSON.stringify(data, null, 2));
      } else {
        setError(error);
        setParsedData(null);
        setFormattedJSON('');
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processJSON = useCallback((jsonString: string, action: 'parse' | 'format' | 'minify' = 'parse') => {
    if (!jsonString.trim()) {
      setError(null);
      setParsedData(null);
      setFormattedJSON('');
      return;
    }

    if (action !== 'parse') {
      setIsLoading(true);
    }
    workerRef.current?.postMessage({ action, data: jsonString });
  }, []);

  const handleInputChange = useCallback((input: string) => {
    setInputJSON(input);
    processJSON(input);
  }, [processJSON]);

  const formatInput = useCallback(() => {
    if (!inputJSON) return;
    processJSON(inputJSON, 'format');
  }, [inputJSON, processJSON]);

  const minifyInput = useCallback(() => {
    if (!inputJSON) return;
    processJSON(inputJSON, 'minify');
  }, [inputJSON, processJSON]);

  const resetInput = useCallback(() => {
    setInputJSON('');
    setFormattedJSON('');
    setParsedData(null);
    setError(null);
  }, []);

  return {
    inputJSON,
    formattedJSON,
    parsedData,
    error,
    isLoading,
    setInputJSON: handleInputChange,
    formatInput,
    minifyInput,
    resetInput
  };
};