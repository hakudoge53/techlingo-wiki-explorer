
import { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <SearchIcon className="h-5 w-5" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tech terms..."
          className="block w-full pl-10 pr-10 py-3 text-base placeholder:text-muted-foreground/70 border-border bg-secondary/30 focus:bg-secondary/50 rounded-xl shadow-inner-highlight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
