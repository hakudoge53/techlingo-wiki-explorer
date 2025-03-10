
import { techTerms } from './termData';

export const syncTermsToStorage = (): void => {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    try {
      const termsForContentScript = techTerms.map(term => ({
        term: term.term,
        description: term.description,
        category: term.category,
        url: term.url
      }));
      
      chrome.storage.local.set({ techTerms: termsForContentScript }, () => {
        console.log('Tech terms synced to storage for content script', termsForContentScript.length);
      });
    } catch (error) {
      console.error('Error syncing terms to storage:', error);
    }
  } else {
    console.log('Chrome API not available - running in development mode');
  }
};

// Initialize sync to storage when this module is imported
if (typeof chrome !== 'undefined' && chrome.storage) {
  syncTermsToStorage();
}
