
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Info } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGlossarySettings } from '@/hooks/useGlossarySettings';
import { useState, useEffect } from 'react';

const GlossarySettings = () => {
  const {
    settings,
    availableGlossaries,
    isLoading,
    isUpdating,
    togglePublicGlossary,
    updateSelectedGlossaries
  } = useGlossarySettings();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Initialize selected IDs when settings are loaded
  useEffect(() => {
    if (settings) {
      setSelectedIds(settings.selectedGlossaryIds);
    }
  }, [settings]);

  const handleToggleGlossary = (glossaryId: string) => {
    if (selectedIds.includes(glossaryId)) {
      setSelectedIds(selectedIds.filter(id => id !== glossaryId));
    } else {
      setSelectedIds([...selectedIds, glossaryId]);
    }
  };

  const handleSaveGlossaries = () => {
    updateSelectedGlossaries(selectedIds);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const hasChanges = settings && JSON.stringify(settings.selectedGlossaryIds) !== JSON.stringify(selectedIds);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          Glossary Settings
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Choose which glossaries to use for term highlighting and definitions.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Public Glossary Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="public-glossary-switch" className="text-sm font-medium">
              TechLingo Public Glossary
            </Label>
            <p className="text-xs text-muted-foreground">
              Common technology terms and definitions
            </p>
          </div>
          <div className="relative">
            <Switch 
              id="public-glossary-switch"
              checked={settings?.publicGlossaryEnabled}
              onCheckedChange={(checked) => togglePublicGlossary(checked)}
              disabled={isUpdating}
            />
            {isUpdating && (
              <span className="absolute -top-1 -right-1">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              </span>
            )}
          </div>
        </div>

        {/* Company Glossaries */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Company Glossaries</h3>
          {availableGlossaries.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              No company glossaries available. Create a glossary through your organization's dashboard.
            </p>
          ) : (
            <>
              <ScrollArea className="h-[200px] rounded-md border">
                <div className="p-4 space-y-2">
                  {availableGlossaries.map((glossary) => (
                    <div key={glossary.id} className="flex items-start space-x-2 py-1">
                      <Checkbox 
                        id={glossary.id}
                        checked={selectedIds.includes(glossary.id)}
                        onCheckedChange={() => handleToggleGlossary(glossary.id)}
                      />
                      <div className="grid gap-1.5">
                        <Label 
                          htmlFor={glossary.id} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {glossary.name}
                        </Label>
                        {glossary.description && (
                          <p className="text-xs text-muted-foreground">
                            {glossary.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {hasChanges && (
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    onClick={handleSaveGlossaries}
                    disabled={isUpdating}
                  >
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlossarySettings;
