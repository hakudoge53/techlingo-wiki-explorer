
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface UserSettings {
  highlight_enabled: boolean;
  highlight_color: string;
}

export const useHighlightSettings = () => {
  const { user } = useAuth();
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [highlightColor, setHighlightColor] = useState('#9b87f5');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      try {
        // Try to get existing settings
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          // If no settings found, create default settings
          if (error.code === 'PGRST116') {
            const { data: newData, error: insertError } = await supabase
              .from('user_settings')
              .insert([{ 
                user_id: user.id, 
                highlight_enabled: true, 
                highlight_color: '#9b87f5' 
              }])
              .select('*')
              .single();
              
            if (insertError) throw insertError;
            
            if (newData) {
              setHighlightEnabled(newData.highlight_enabled);
              setHighlightColor(newData.highlight_color);
              console.log('Created default highlight settings:', newData);
            }
          } else {
            throw error;
          }
        } else if (data) {
          setHighlightEnabled(data.highlight_enabled);
          setHighlightColor(data.highlight_color);
          console.log('Loaded highlight settings:', data);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [user]);

  // Save preferences to Supabase and update content script
  const saveSettings = async (settings: Partial<UserSettings>) => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('user_settings')
        .update(settings)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      console.log('Saved settings:', settings);
      
      // Update content script with new settings
      const updatedEnabled = settings.highlight_enabled !== undefined ? settings.highlight_enabled : highlightEnabled;
      const updatedColor = settings.highlight_color !== undefined ? settings.highlight_color : highlightColor;
      
      const success = await updateContentScript(updatedEnabled, updatedColor);
      
      if (success) {
        toast.success('Settings updated');
      } else {
        toast.error('Failed to update highlighting. Try refreshing the page.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    highlightEnabled,
    highlightColor,
    isLoading,
    isUpdating,
    setHighlightEnabled: (enabled: boolean) => {
      setHighlightEnabled(enabled);
      saveSettings({ highlight_enabled: enabled });
    },
    setHighlightColor: (color: string) => {
      setHighlightColor(color);
      saveSettings({ highlight_color: color });
    }
  };
};

// Helper function to update content script
const updateContentScript = (enabled: boolean, color: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // If we're not in a Chrome extension environment, resolve with success
    // This handles development mode where Chrome APIs aren't available
    if (typeof chrome === 'undefined' || !chrome.tabs || !chrome.tabs.query) {
      console.log('Chrome API not available - running in development mode');
      resolve(true);
      return;
    }
    
    // Set a timeout to handle cases where the message response never comes back
    const timeoutId = setTimeout(() => {
      console.error('Timeout: No response from content script');
      resolve(false);
    }, 3000);
    
    // Try to send message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // If no active tab found, resolve with failure
      if (!tabs || !tabs[0] || !tabs[0].id) {
        console.log('No active tab found');
        clearTimeout(timeoutId);
        resolve(false);
        return;
      }
      
      try {
        // Send message to content script
        chrome.tabs.sendMessage(
          tabs[0].id, 
          { 
            action: 'updateHighlightSettings', 
            settings: { 
              enabled: enabled,
              color: color 
            } 
          },
          (response) => {
            clearTimeout(timeoutId);
            
            // Check for runtime error
            const error = chrome.runtime?.lastError;
            if (error) {
              console.error('Error sending message:', error);
              resolve(false);
              return;
            }
            
            // Check for valid response
            if (!response) {
              console.error('No response from content script');
              resolve(false);
              return;
            }
            
            console.log('Content script response:', response);
            resolve(response.success === true);
          }
        );
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Exception sending message to content script:', error);
        resolve(false);
      }
    });
  });
};
