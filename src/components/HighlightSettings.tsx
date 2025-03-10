
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useHighlightSettings } from '@/hooks/useHighlightSettings';
import HighlightToggle from './highlight/HighlightToggle';
import HighlightColorPicker from './highlight/HighlightColorPicker';
import { useEffect } from 'react';
import { syncTermsToStorage } from '@/utils/termUtils';

const HighlightSettings = () => {
  const {
    highlightEnabled,
    highlightColor,
    isLoading,
    isUpdating,
    setHighlightEnabled,
    setHighlightColor
  } = useHighlightSettings();

  // Make sure terms are synced to storage when the component mounts
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      syncTermsToStorage();
    }
  }, []);

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
        <HighlightToggle 
          enabled={highlightEnabled}
          onToggle={setHighlightEnabled}
          isUpdating={isUpdating}
        />
        
        <HighlightColorPicker
          color={highlightColor}
          onChange={setHighlightColor}
          isUpdating={isUpdating}
        />
      </CardContent>
    </Card>
  );
};

export default HighlightSettings;
