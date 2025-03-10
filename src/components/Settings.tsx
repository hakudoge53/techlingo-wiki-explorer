
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import UserProfile from './UserProfile';
import HighlightSettings from './HighlightSettings';
import GlossarySettings from './GlossarySettings';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import NewTermForm from './NewTermForm';

const Settings = () => {
  const { signOut } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-6">
      <UserProfile />
      
      <Separator className="my-6" />
      
      <GlossarySettings />
      
      <div className="flex justify-end mt-2">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Term
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Glossary Term</DialogTitle>
            </DialogHeader>
            <NewTermForm onSuccess={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator className="my-6" />
      
      <HighlightSettings />
      
      <div className="flex justify-end mt-6">
        <Button 
          variant="destructive" 
          onClick={signOut}
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
