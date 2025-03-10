
import { TechTerm } from './types';
import { techTerms } from './termData';

export const filterTerms = (terms: TechTerm[], query: string): TechTerm[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return terms;
  
  return terms.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) || 
    term.description.toLowerCase().includes(lowercaseQuery) ||
    term.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchTerms = (terms: TechTerm[], query: string): TechTerm[] => {
  return filterTerms(terms, query);
};

export const filterByCategory = (terms: TechTerm[], category: string): TechTerm[] => {
  if (!category || category === "All") return terms;
  return terms.filter(term => term.category === category);
};

export const getTermById = (id: string): TechTerm | undefined => {
  return techTerms.find(term => term.id === id);
};

export const getTermByName = (name: string): TechTerm | undefined => {
  return techTerms.find(term => 
    term.term.toLowerCase() === name.toLowerCase()
  );
};

export const getRelatedTerms = (term: TechTerm): TechTerm[] => {
  if (!term.relatedTerms || term.relatedTerms.length === 0) return [];
  
  return techTerms.filter(t => 
    term.relatedTerms?.includes(t.term) && t.id !== term.id
  ).slice(0, 3);
};

export const prepareTermsForHighlighting = () => {
  // Sort terms by length (descending) to prioritize longer terms
  const sortedTerms = [...techTerms].sort((a, b) => 
    b.term.length - a.term.length
  );
  
  // Create a simplified version with just the necessary data
  return sortedTerms.map(term => ({
    id: term.id,
    term: term.term,
    category: term.category,
    description: term.description.substring(0, 150) + (term.description.length > 150 ? '...' : '')
  }));
};

// Helper function to escape special regex characters
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Sync terms to extension storage for the content script to use
export const syncTermsToStorage = (): void => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    try {
      const termsForHighlighting = prepareTermsForHighlighting();
      
      chrome.storage.local.set({ 
        techTerms: termsForHighlighting 
      }, () => {
        console.log('Tech terms synced to storage:', termsForHighlighting.length);
      });
    } catch (error) {
      console.error('Error syncing terms to storage:', error);
    }
  }
};

// Initialize when module is loaded if we're in extension context
if (typeof chrome !== 'undefined' && chrome.storage) {
  syncTermsToStorage();
}
