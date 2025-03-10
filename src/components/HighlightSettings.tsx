
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserSettings {
  highlight_enabled: boolean;
  highlight_color: string;
}

const HighlightSettings = () => {
  const { user } = useAuth();
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [highlightColor, setHighlightColor] = useState('#9b87f5');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load saved preferences on component mount
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
          
          // Update content script with loaded settings
          updateContentScript(data.highlight_enabled, data.highlight_color);
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

  // Send message to content script to update highlighting
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

  const handleToggleHighlight = (checked: boolean) => {
    setHighlightEnabled(checked);
    saveSettings({ highlight_enabled: checked });
  };

  const handleColorChange = (color: string) => {
    setHighlightColor(color);
    saveSettings({ highlight_color: color });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Highlight Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="highlight-switch" className="text-sm font-medium">
              Highlight tech terms on websites
            </Label>
            <p className="text-xs text-muted-foreground">
              Automatically highlight tech terms while browsing
            </p>
          </div>
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="highlight-color" className="text-sm font-medium">
            Highlight Color
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="highlight-color"
              type="color"
              value={highlightColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-12 h-8 p-1 cursor-pointer"
              disabled={isUpdating}
            />
            <div 
              className="w-8 h-8 rounded-full border" 
              style={{ backgroundColor: highlightColor }}
            ></div>
            <Input
              type="text"
              value={highlightColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-24"
              disabled={isUpdating}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightSettings;
