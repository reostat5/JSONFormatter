/**
 * Formats JSON string with proper indentation
 */
export const formatJSON = (jsonString: string, spaces: number = 2): string => {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, spaces);
  } catch (e) {
    return jsonString; // Return original if parsing fails
  }
};

/**
 * Minifies JSON string by removing whitespace
 */
export const minifyJSON = (jsonString: string): string => {
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj);
  } catch (e) {
    return jsonString; // Return original if parsing fails
  }
};

/**
 * Validates JSON and returns parsed object or error
 */
export const parseJSON = (jsonString: string): { data: any, error: string | null } => {
  if (!jsonString.trim()) {
    return { data: null, error: null };
  }
  
  try {
    const parsed = JSON.parse(jsonString);
    return { data: parsed, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e.message };
    }
    return { data: null, error: 'Unknown error parsing JSON' };
  }
};

/**
 * Get info about the JSON structure
 */
export const getJSONInfo = (jsonData: any): { 
  size: string, 
  nodeCount: number, 
  depth: number 
} => {
  if (!jsonData) {
    return { size: '0 B', nodeCount: 0, depth: 0 };
  }
  
  const jsonString = JSON.stringify(jsonData);
  const bytes = new TextEncoder().encode(jsonString).length;
  
  let size: string;
  if (bytes < 1024) {
    size = `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    size = `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    size = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  
  let nodeCount = 0;
  let maxDepth = 0;
  
  const countNodes = (obj: any, depth: number = 0) => {
    nodeCount++;
    maxDepth = Math.max(maxDepth, depth);
    
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        countNodes(obj[key], depth + 1);
      }
    }
  };
  
  countNodes(jsonData);
  
  return { size, nodeCount, depth: maxDepth };
};