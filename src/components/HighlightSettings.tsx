
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useHighlightSettings } from '@/hooks/useHighlightSettings';
import HighlightToggle from './highlight/HighlightToggle';
import HighlightColorPicker from './highlight/HighlightColorPicker';

const HighlightSettings = () => {
  const {
    highlightEnabled,
    highlightColor,
    isLoading,
    isUpdating,
    setHighlightEnabled,
    setHighlightColor
  } = useHighlightSettings();

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
