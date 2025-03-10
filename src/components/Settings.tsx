
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import UserProfile from './UserProfile';
import HighlightSettings from './HighlightSettings';

const Settings = () => {
  const { signOut } = useAuth();

  return (
    <div className="space-y-6">
      <UserProfile />
      
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
