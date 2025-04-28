// Web Worker for JSON processing
self.onmessage = (e: MessageEvent) => {
  const { action, data } = e.data;
  
  try {
    let result;
    switch (action) {
      case 'parse':
        result = JSON.parse(data);
        self.postMessage({ success: true, data: result });
        break;
      case 'format':
        const parsed = JSON.parse(data);
        result = JSON.stringify(parsed, null, 2);
        self.postMessage({ success: true, data: result });
        break;
      case 'minify':
        const obj = JSON.parse(data);
        result = JSON.stringify(obj);
        self.postMessage({ success: true, data: result });
        break;
      default:
        self.postMessage({ 
          success: false, 
          error: 'Unknown action' 
        });
    }
  } catch (error) {
    self.postMessage({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};