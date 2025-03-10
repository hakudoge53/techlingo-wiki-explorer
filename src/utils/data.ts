
// This is a barrel file that re-exports everything from the new modular files
// for backward compatibility with existing imports

export type { TechTerm } from './types';
export { categories } from './categories';
export { techTerms } from './termData';
export { 
  filterTerms,
  filterByCategory,
  getTermById,
  getRelatedTerms
} from './termUtils';
export { syncTermsToStorage } from './chromeStorage';
