
import { useState } from 'react';
import Search from '@/components/Search';
import TermList from '@/components/TermList';
import Settings from '@/components/Settings';
import { techTerms } from '@/utils/data';

const GlossaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  
  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <header className="p-4 border-b shadow-sm bg-card/30 backdrop-blur-[2px]">
        <h1 className="text-2xl font-bold text-center mb-2">TechLingo Wiki</h1>
        <Search onSearch={setSearchQuery} />
      </header>
      
      <main className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        <TermList searchQuery={searchQuery} onSelectTerm={setSelectedTerm} />
      </main>
      
      <Settings />
      
      <footer className="p-2 text-center text-xs text-muted-foreground border-t bg-card/30 backdrop-blur-[2px]">
        <p>TechLingo Wiki © {new Date().getFullYear()}</p>
        <p className="text-xs opacity-60 mt-1">{techTerms.length} terms in database</p>
      </footer>
    </div>
  );
};

export default GlossaryView;
