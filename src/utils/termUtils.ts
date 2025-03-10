
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

export const getRelatedTerms = (term: TechTerm): TechTerm[] => {
  if (!term.relatedTerms || term.relatedTerms.length === 0) return [];
  
  return techTerms.filter(t => 
    term.relatedTerms?.includes(t.term) && t.id !== term.id
  ).slice(0, 3);
};
