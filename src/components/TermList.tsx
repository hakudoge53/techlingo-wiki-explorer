
import { useState, useEffect } from 'react';
import { categories, techTerms, filterTerms, filterByCategory, type TechTerm } from '@/utils/data';
import TermCard from './TermCard';
import Search from './Search';

const TermList = () => {
  const [filteredTerms, setFilteredTerms] = useState<TechTerm[]>(techTerms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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

  return (
    <section id="explore" className="py-8 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            TECH GLOSSARY
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Explore Technology Terms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search our comprehensive database of technology terminology, or browse by category to expand your tech vocabulary.
          </p>
        </div>
        
        <Search onSearch={setSearchQuery} />
        
        <div className="mt-6" id="categories">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
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
          
          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTerms.map((term, index) => (
                <TermCard key={term.id} term={term} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
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
