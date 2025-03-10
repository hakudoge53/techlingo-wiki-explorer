
import { useState } from 'react';
import TermList from '../components/TermList';
import { getTermById } from '../utils/data';

const GlossaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  
  const selectedTerm = selectedTermId ? getTermById(selectedTermId) : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tech Glossary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <TermList 
            searchQuery={searchQuery} 
            onSelectTerm={setSelectedTermId} 
          />
        </div>
        
        <div className="md:col-span-2">
          {selectedTerm ? (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-2">{selectedTerm.term}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedTerm.category}</p>
              <p className="mb-4">{selectedTerm.description}</p>
              
              {selectedTerm.longDescription && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">More Information</h3>
                  <p>{selectedTerm.longDescription}</p>
                </div>
              )}
              
              {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Examples</h3>
                  <ul className="list-disc list-inside">
                    {selectedTerm.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Related Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((term, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-200"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow flex items-center justify-center h-full">
              <p className="text-gray-500">Select a term to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryView;
