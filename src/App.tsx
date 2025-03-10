
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import TermList from '@/components/TermList';
import Footer from '@/components/Footer';
import Settings from '@/components/Settings';
import { techTerms } from '@/utils/data';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');

  // Send glossary terms to the content script when they're needed
  const sendTermsToContentScript = async () => {
    try {
      if (chrome?.tabs) {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const activeTab = tabs[0];
        if (activeTab?.id) {
          chrome.tabs.sendMessage(activeTab.id, {
            action: 'updateGlossary',
            terms: techTerms
          }, (response) => {
            if (chrome.runtime.lastError) {
              console.log('Content script not ready yet');
            } else if (response?.success) {
              toast.success("Technical terms on page will be highlighted");
            }
          });
        }
      }
    } catch (error) {
      console.error('Error sending terms to content script:', error);
    }
  };

  useEffect(() => {
    // Save terms to storage when app loads
    if (chrome?.storage) {
      chrome.storage.local.set({ glossaryTerms: techTerms });
    }
  }, []);

  const handleHighlightPage = () => {
    sendTermsToContentScript();
  };

  return (
    <div className="popup-container">
      <div className="flex flex-col h-full">
        <Navbar />
        
        {/* Add top padding to account for fixed navbar */}
        <div className="flex-1 flex flex-col pt-16 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
            <div className="px-4 py-2 border-b">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="explore">Explore</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="explore" className="mt-0 p-0 h-full">
                <div className="px-4 py-3">
                  <Search onSearch={setSearchQuery} />
                  <button 
                    onClick={handleHighlightPage}
                    className="w-full mt-2 p-2 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
                  >
                    Highlight Terms on This Page
                  </button>
                </div>
                <TermList 
                  searchQuery={searchQuery} 
                />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0 h-full">
                <Settings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
