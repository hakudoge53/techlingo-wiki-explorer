
// Type definitions for Chrome extension API
interface Chrome {
  storage: {
    sync: {
      get: (keys: string | string[] | object, callback: (items: any) => void) => void;
      set: (items: object, callback?: () => void) => void;
    };
    local: {
      get: (keys: string | string[] | object, callback: (items: any) => void) => void;
      set: (items: object, callback?: () => void) => void;
    };
  };
  tabs: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }, callback: (tabs: { id?: number }[]) => void) => void;
    sendMessage: (tabId: number, message: any, callback?: (response: any) => void) => void;
  };
  runtime: {
    sendMessage: (message: any, callback?: (response: any) => void) => void;
    lastError?: {
      message?: string;
    };
  };
}

declare global {
  interface Window {
    chrome: Chrome;
  }
  var chrome: Chrome;
}

export {};
