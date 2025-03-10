
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface HighlightToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  isUpdating: boolean;
}

const HighlightToggle = ({ enabled, onToggle, isUpdating }: HighlightToggleProps) => {
  return (
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
          checked={enabled}
          onCheckedChange={onToggle}
          disabled={isUpdating}
        />
        {isUpdating && (
          <span className="absolute -top-1 -right-1">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
          </span>
        )}
      </div>
    </div>
  );
};

export default HighlightToggle;
