
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface HighlightColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  isUpdating: boolean;
}

const HighlightColorPicker = ({ color, onChange, isUpdating }: HighlightColorPickerProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="highlight-color" className="text-sm font-medium">
        Highlight Color
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="highlight-color"
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 p-1 cursor-pointer"
          disabled={isUpdating}
        />
        <div 
          className="w-8 h-8 rounded-full border" 
          style={{ backgroundColor: color }}
        ></div>
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-24"
          disabled={isUpdating}
        />
      </div>
    </div>
  );
};

export default HighlightColorPicker;
