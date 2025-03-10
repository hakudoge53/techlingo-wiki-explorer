
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGlossarySettings } from '@/hooks/useGlossarySettings';
import { Loader2 } from 'lucide-react';
import { categories } from '@/utils/data';
import { toast } from '@/components/ui/use-toast';

interface NewTermFormProps {
  onSuccess?: () => void;
}

const NewTermForm = ({ onSuccess }: NewTermFormProps) => {
  const { user } = useAuth();
  const { availableGlossaries } = useGlossarySettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    category: '',
    url: '',
    glossaryId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to add terms.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.glossaryId) {
      toast({
        title: "Glossary required",
        description: "Please select a glossary to add this term to.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('glossary_terms')
        .insert({
          term: formData.term,
          definition: formData.definition,
          category: formData.category || null,
          url: formData.url || null,
          glossary_id: formData.glossaryId
        });

      if (error) throw error;
      
      toast({
        title: "Term added",
        description: `"${formData.term}" has been added to the glossary.`,
      });
      
      // Reset form
      setFormData({
        term: '',
        definition: '',
        category: '',
        url: '',
        glossaryId: ''
      });
      
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      console.error('Error adding term:', error);
      toast({
        title: "Failed to add term",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="glossaryId">Glossary</Label>
        <Select
          value={formData.glossaryId}
          onValueChange={(value) => handleSelectChange('glossaryId', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a glossary" />
          </SelectTrigger>
          <SelectContent>
            {availableGlossaries.map((glossary) => (
              <SelectItem key={glossary.id} value={glossary.id}>
                {glossary.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="term">Term</Label>
        <Input
          id="term"
          name="term"
          value={formData.term}
          onChange={handleChange}
          placeholder="Enter term name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="definition">Definition</Label>
        <Textarea
          id="definition"
          name="definition"
          value={formData.definition}
          onChange={handleChange}
          placeholder="Enter definition"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">Read More URL (optional)</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com/learn-more"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Term
        </Button>
      </div>
    </form>
  );
};

export default NewTermForm;
