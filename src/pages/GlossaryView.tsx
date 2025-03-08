
import { useState } from 'react';
import Search from '@/components/Search';
import TermList from '@/components/TermList';
import { useStaggeredAnimation } from '@/utils/animations';
import { techTerms, filterTerms } from '@/utils/data';

const GlossaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter terms based on search query
  const filteredTerms = searchQuery
    ? filterTerms(techTerms, searchQuery)
    : techTerms;
  
  return (
    <div className="flex flex-col w-full h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center mb-2">TechLingo Wiki</h1>
        <Search onSearch={setSearchQuery} />
      </header>
      
      <main className="flex-grow overflow-y-auto p-4">
        <TermList />
      </main>
      
      <footer className="p-2 text-center text-xs text-gray-500 border-t">
        TechLingo Wiki © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default GlossaryView;
