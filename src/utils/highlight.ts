
import { techTerms } from './data';

/**
 * Highlights occurrences of tech terms within a given text
 * @param text The text to process
 * @returns HTML string with highlighted terms
 */
export const highlightKeywords = (text: string): string => {
  if (!text) return '';
  
  // Sort terms by length (descending) to prioritize longer terms
  // This prevents partial matches within longer terms
  const sortedTerms = [...techTerms].sort((a, b) => 
    b.term.length - a.term.length
  );
  
  let processedText = text;
  const processedTerms = new Set<string>(); // Track terms we've already processed
  
  // Process each term
  for (const item of sortedTerms) {
    const term = item.term;
    
    // Skip if we already processed this term
    if (processedTerms.has(term.toLowerCase())) continue;
    
    // Create a regex that matches the term as a whole word with case insensitivity
    // This prevents matching parts of words
    const regex = new RegExp(`\\b(${escapeRegExp(term)})\\b`, 'gi');
    
    // Replace occurrences with highlighted version, but don't highlight the term in its own card
    if (item.term !== text && regex.test(processedText)) {
      processedText = processedText.replace(regex, (match) => {
        return `<span class="bg-primary/10 text-primary font-medium px-1 rounded">${match}</span>`;
      });
    }
    
    // Mark as processed
    processedTerms.add(term.toLowerCase());
  }
  
  return processedText;
};

/**
 * Escapes special characters in a string for use in a RegExp
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Export this for potential reuse in other modules
export const syncTermsToStorage = (): void => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ techTerms });
  }
};
