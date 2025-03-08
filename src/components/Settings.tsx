
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [highlightEnabled, setHighlightEnabled] = useState(false);

  // Load saved preference on component mount
  useEffect(() => {
    // Check if Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['highlightEnabled'], (result) => {
        setHighlightEnabled(result.highlightEnabled || false);
      });
    }
  }, []);

  // Save preference when checkbox is toggled
  const handleToggleHighlight = (checked: boolean) => {
    setHighlightEnabled(checked);
    
    // Check if Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ highlightEnabled: checked });
      
      // Send message to content script to update highlighting
      if (chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: 'toggleHighlight', 
              enabled: checked 
            });
          }
        });
      }
    } else {
      console.log('Chrome API not available - running in development mode');
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="highlight-switch" className="text-sm font-medium">
            Highlight tech terms on all websites
          </Label>
          <p className="text-xs text-muted-foreground">
            Automatically highlight tech terms while browsing web pages
          </p>
        </div>
        <Switch 
          id="highlight-switch"
          checked={highlightEnabled}
          onCheckedChange={handleToggleHighlight}
        />
      </div>
    </div>
  );
};

export default Settings;
