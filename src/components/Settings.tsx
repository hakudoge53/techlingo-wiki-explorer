
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

const Settings = () => {
  const [highlightEnabled, setHighlightEnabled] = useState(false);

  // Load saved preference on component mount
  useEffect(() => {
    // Check if Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['highlightEnabled'], (result) => {
        setHighlightEnabled(result.highlightEnabled || false);
        console.log('Loaded highlight setting:', result.highlightEnabled);
      });
    }
  }, []);

  // Save preference when checkbox is toggled
  const handleToggleHighlight = (checked: boolean) => {
    setHighlightEnabled(checked);
    
    // Check if Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ highlightEnabled: checked }, () => {
        console.log('Saved highlight setting:', checked);
      });
      
      // Send message to content script to update highlighting
      if (chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.tabs.sendMessage(
              tabs[0].id, 
              { action: 'toggleHighlight', enabled: checked },
              (response) => {
                // Check for error using try-catch since lastError may not be defined in types
                try {
                  // TypeScript-safe way to check for messaging errors
                  const error = chrome.runtime && 'lastError' in chrome.runtime 
                    ? (chrome.runtime as any).lastError 
                    : null;
                  
                  if (error) {
                    console.error('Error sending message:', error);
                    toast.error("Failed to update highlighting. Try refreshing the page.");
                  } else if (response?.success) {
                    console.log('Highlighting updated successfully');
                    toast.success(checked ? "Terms will be highlighted on pages" : "Highlighting disabled");
                  }
                } catch (err) {
                  console.error('Error in message callback:', err);
                  toast.error("An unexpected error occurred");
                }
              }
            );
          } else {
            console.log('No active tab found');
            toast.warning("No active tab found. Try again on a webpage.");
          }
        });
      } else {
        console.log('Chrome API for tabs not available');
      }
    } else {
      console.log('Chrome API not available - running in development mode');
      toast.info('Running in development mode - highlighting simulated');
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
