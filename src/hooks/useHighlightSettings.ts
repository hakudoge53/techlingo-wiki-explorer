
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
      toast.success('Settings updated');
      
      // Update content script with new settings
      updateContentScript(
        settings.highlight_enabled !== undefined ? settings.highlight_enabled : highlightEnabled,
        settings.highlight_color !== undefined ? settings.highlight_color : highlightColor
      );
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
const updateContentScript = (enabled: boolean, color: string) => {
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
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
            // Check for error using runtime.lastError
            const error = chrome.runtime?.lastError;
            
            if (error) {
              console.error('Error sending message:', error);
            } else if (response?.success) {
              console.log('Highlighting updated successfully');
            }
          }
        );
      } else {
        console.log('No active tab found');
      }
    });
  } else {
    console.log('Chrome API not available - running in development mode');
  }
};
