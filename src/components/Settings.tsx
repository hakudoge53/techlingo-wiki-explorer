
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';

const Settings = () => {
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load saved preference on component mount
  useEffect(() => {
    // Check if Chrome API is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['highlightEnabled'], (result) => {
        setHighlightEnabled(result.highlightEnabled || false);
        console.log('Loaded highlight setting:', result.highlightEnabled);
        setIsLoading(false);
      });
    } else {
      // For development mode
      setIsLoading(false);
    }
  }, []);

  // Save preference when checkbox is toggled
  const handleToggleHighlight = (checked: boolean) => {
    setHighlightEnabled(checked);
    setIsUpdating(true);
    
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
                // Check for error using runtime.lastError
                const error = chrome.runtime?.lastError;
                setIsUpdating(false);
                
                if (error) {
                  console.error('Error sending message:', error);
                  toast.error("Failed to update highlighting. Try refreshing the page.");
                } else if (response?.success) {
                  console.log('Highlighting updated successfully');
                  toast.success(checked ? "Terms will be highlighted on pages" : "Highlighting disabled");
                }
              }
            );
          } else {
            console.log('No active tab found');
            setIsUpdating(false);
            toast.warning("No active tab found. Try again on a webpage.");
          }
        });
      } else {
        console.log('Chrome API for tabs not available');
        setIsUpdating(false);
      }
    } else {
      console.log('Chrome API not available - running in development mode');
      setTimeout(() => {
        setIsUpdating(false);
        toast.info('Running in development mode - highlighting simulated');
      }, 800);
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
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <div className="relative">
            <Switch 
              id="highlight-switch"
              checked={highlightEnabled}
              onCheckedChange={handleToggleHighlight}
              disabled={isUpdating}
            />
            {isUpdating && (
              <span className="absolute -top-1 -right-1">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
