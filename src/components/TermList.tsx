
import { useState, useEffect } from 'react';
import { techTerms } from '@/utils/termData';
import Search from '@/components/Search';
import TermCard from '@/components/TermCard';
import { Button } from '@/components/ui/button';
import CategoryButton from '@/components/CategoryButton';
import { getCategories } from '@/utils/categories';
import { filterByCategory, searchTerms } from '@/utils/termUtils';
import { ScrollArea } from '@/components/ui/scroll-area';

const TermList = ({ searchQuery, onSelectTerm }: { searchQuery?: string, onSelectTerm?: (id: string) => void }) => {
  const [filteredTerms, setFilteredTerms] = useState(techTerms);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use prop searchQuery if provided, otherwise use local state
  const effectiveSearchQuery = searchQuery !== undefined ? searchQuery : localSearch;

  useEffect(() => {
    let result = techTerms;
    if (effectiveSearchQuery) {
      result = searchTerms(result, effectiveSearchQuery);
    }
    if (selectedCategory !== 'All') {
      result = filterByCategory(result, selectedCategory);
    }
    setFilteredTerms(result);
  }, [effectiveSearchQuery, selectedCategory]);

  const handleTermClick = (id: string) => {
    if (onSelectTerm) {
      onSelectTerm(id);
    }
  };

  return (
    <section id="explore" className="py-4 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block py-1 px-3 mb-2 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            TECH GLOSSARY
          </span>
          <h2 className="text-xl font-bold mb-2">Technology Terms</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Search our database of {techTerms.length} technology terms
          </p>
        </div>

        {searchQuery === undefined && <Search onSearch={setLocalSearch} />}

        <div className="mt-4" id="categories">
          <div className="whitespace-nowrap pb-2 overflow-x-auto">
            <div className="flex space-x-2 px-1">
              <CategoryButton 
                category="All" 
                isSelected={selectedCategory === 'All'} 
                onClick={() => setSelectedCategory('All')} 
              />
              {getCategories().map((category) => (
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
            <ScrollArea className="h-[400px] mt-4">
              <div className="space-y-1 pr-4">
                {filteredTerms.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    index={index}
                    onClick={() => handleTermClick(term.id)}
                    compact
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

export default TermList;
