
import Settings from '@/components/Settings';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="container max-w-md py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Tech</span>Lingo Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Manage your account and preferences
        </p>
      </div>
      
      {user ? <Settings /> : <AuthForm />}
    </div>
  );
};

export default SettingsPage;
