
export interface TechTerm {
  id: string;
  term: string;
  category: string;
  description: string;
  longDescription?: string;
  examples?: string[];
  relatedTerms?: string[];
  url?: string;
}
