
import { useState } from 'react';
import Search from '@/components/Search';
import TermList from '@/components/TermList';
import Settings from '@/components/Settings';
import { techTerms, getTermById } from '@/utils/data';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const GlossaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  const selectedTerm = selectedTermId ? getTermById(selectedTermId) : null;
  
  const handleBack = () => {
    setSelectedTermId(null);
  };
  
  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <header className="p-4 border-b shadow-sm bg-card/30 backdrop-blur-[2px]">
        <h1 className="text-xl font-bold text-center mb-2">TechLingo Wiki</h1>
        {!selectedTerm && <Search onSearch={setSearchQuery} />}
      </header>
      
      <main className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {selectedTerm ? (
          <div className="p-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="mb-4"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to list
            </Button>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedTerm.term}</h2>
                <Badge variant="secondary" className="mt-1">
                  {selectedTerm.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{selectedTerm.description}</p>
              
              {selectedTerm.longDescription && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <p>{selectedTerm.longDescription}</p>
                </div>
              )}
              
              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Examples</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {selectedTerm.examples.map((example, index) => (
                      <li key={index} className="text-sm">{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Related Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((term) => (
                      <Badge key={term} variant="outline" className="cursor-pointer hover:bg-secondary">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4 mt-6">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon className="h-3 w-3 mr-1" />
                    View full documentation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <TermList searchQuery={searchQuery} onSelectTerm={setSelectedTermId} />
        )}
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
