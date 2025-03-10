
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface GlossarySettingsType {
  id: string;
  publicGlossaryEnabled: boolean;
  selectedGlossaryIds: string[];
}

export interface GlossaryType {
  id: string;
  name: string;
  description: string | null;
  organization_id: string;
}

export const useGlossarySettings = () => {
  const [settings, setSettings] = useState<GlossarySettingsType | null>(null);
  const [availableGlossaries, setAvailableGlossaries] = useState<GlossaryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();

  // Fetch settings and available glossaries
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch user's glossary settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('glossary_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (settingsError && settingsError.code !== 'PGRST116') {
          console.error('Error fetching glossary settings:', settingsError);
        }

        // Fetch available glossaries for the user
        const { data: glossariesData, error: glossariesError } = await supabase
          .from('glossaries')
          .select('*');

        if (glossariesError) {
          console.error('Error fetching glossaries:', glossariesError);
        }

        // Initialize settings if they don't exist
        if (!settingsData) {
          const { data: newSettings, error: createError } = await supabase
            .from('glossary_settings')
            .insert([
              { 
                user_id: user.id,
                public_glossary_enabled: true,
                selected_glossary_ids: []
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error('Error creating glossary settings:', createError);
          } else {
            setSettings({
              id: newSettings.id,
              publicGlossaryEnabled: newSettings.public_glossary_enabled,
              selectedGlossaryIds: newSettings.selected_glossary_ids || []
            });
          }
        } else {
          setSettings({
            id: settingsData.id,
            publicGlossaryEnabled: settingsData.public_glossary_enabled,
            selectedGlossaryIds: settingsData.selected_glossary_ids || []
          });
        }

        if (glossariesData) {
          setAvailableGlossaries(glossariesData);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Toggle public glossary
  const togglePublicGlossary = async (enabled: boolean) => {
    if (!user || !settings) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('glossary_settings')
        .update({ 
          public_glossary_enabled: enabled,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setSettings({
        ...settings,
        publicGlossaryEnabled: enabled
      });

      toast({
        title: enabled ? "Public glossary enabled" : "Public glossary disabled",
        description: "Your settings have been updated.",
      });
    } catch (error) {
      console.error('Error toggling public glossary:', error);
      toast({
        title: "Failed to update settings",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Update selected glossaries
  const updateSelectedGlossaries = async (glossaryIds: string[]) => {
    if (!user || !settings) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('glossary_settings')
        .update({ 
          selected_glossary_ids: glossaryIds,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setSettings({
        ...settings,
        selectedGlossaryIds: glossaryIds
      });

      toast({
        title: "Glossary settings updated",
        description: "Your selected glossaries have been updated.",
      });
    } catch (error) {
      console.error('Error updating selected glossaries:', error);
      toast({
        title: "Failed to update settings",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    settings,
    availableGlossaries,
    isLoading,
    isUpdating,
    togglePublicGlossary,
    updateSelectedGlossaries
  };
};
