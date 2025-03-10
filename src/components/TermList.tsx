
import { useState, useEffect } from 'react';
import { categories, techTerms, filterTerms, filterByCategory, type TechTerm } from '@/utils/data';
import TermCard from './TermCard';
import Search from './Search';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermListProps {
  searchQuery?: string;
  onSelectTerm?: (term: string | null) => void;
}

const TermList = ({ searchQuery: externalSearchQuery, onSelectTerm }: TermListProps = {}) => {
  const [filteredTerms, setFilteredTerms] = useState<TechTerm[]>(techTerms);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Use external search query if provided, otherwise use internal
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  
  // Apply filters whenever search query or category changes
  useEffect(() => {
    let result = techTerms;
    
    if (searchQuery) {
      result = filterTerms(result, searchQuery);
    }
    
    if (selectedCategory !== 'All') {
      result = filterByCategory(result, selectedCategory);
    }
    
    setFilteredTerms(result);
  }, [searchQuery, selectedCategory]);

  const handleTermSelect = (termId: string) => {
    // Call the external handler if provided
    if (onSelectTerm) {
      onSelectTerm(termId);
    }
  };

  return (
    <section id="explore" className="py-4 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block py-1 px-3 mb-2 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            TECH GLOSSARY
          </span>
          <h2 className="text-xl font-bold mb-2">
            Technology Terms
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Search our database of {techTerms.length} technology terms
          </p>
        </div>
        
        {/* Only show internal search if external search is not provided */}
        {externalSearchQuery === undefined && (
          <Search onSearch={setInternalSearchQuery} />
        )}
        
        <div className="mt-4" id="categories">
          <div className="whitespace-nowrap pb-2 overflow-x-auto">
            <div className="flex space-x-2 px-1">
              <CategoryButton 
                category="All" 
                isSelected={selectedCategory === 'All'} 
                onClick={() => setSelectedCategory('All')} 
              />
              
              {categories.map(category => (
                <CategoryButton 
                  key={category}
                  category={category} 
                  isSelected={selectedCategory === category} 
                  onClick={() => setSelectedCategory(category)} 
                />
              ))}
            </div>
          </div>
          
          {filteredTerms.length > 0 ? (
            <ScrollArea className="h-[400px] mt-4 pr-4">
              <div className="space-y-1">
                {filteredTerms.map((term, index) => (
                  <TermCard 
                    key={term.id} 
                    term={term} 
                    index={index}
                    onClick={() => handleTermSelect(term.id)}
                    compact={true}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CategoryButton = ({ 
  category, 
  isSelected, 
  onClick 
}: { 
  category: string; 
  isSelected: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
      isSelected 
        ? 'bg-primary text-primary-foreground shadow-soft' 
        : 'bg-secondary/60 text-foreground hover:bg-secondary'
    }`}
  >
    {category}
  </button>
);

export default TermList;
