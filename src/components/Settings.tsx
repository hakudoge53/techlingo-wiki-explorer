
import UserProfile from './UserProfile';
import HighlightSettings from './HighlightSettings';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  // If no user is authenticated, don't render settings
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 border-t">
      <UserProfile />
      <HighlightSettings />
    </div>
  );
};

export default Settings;
