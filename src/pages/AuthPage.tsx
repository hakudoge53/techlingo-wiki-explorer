
import AuthForm from '@/components/AuthForm';

const AuthPage = () => {
  return (
    <div className="container max-w-md py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Tech</span>Lingo Wiki
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Sign in to access your Tech terminology assistant
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
