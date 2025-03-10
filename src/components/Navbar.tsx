
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "w-full h-16 transition-all duration-300 px-6 md:px-8 flex items-center justify-between",
        isScrolled ? "glass shadow-soft" : "bg-background"
      )}
    >
      <Link 
        to="/" 
        className="font-display text-xl font-medium transition-opacity hover:opacity-80"
      >
        <span className="text-primary">Tech</span>Lingo
      </Link>
      
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink to="/" label="Home" active={location.pathname === '/'} />
        <NavLink to="/glossary" label="Glossary" active={location.pathname === '/glossary'} />
        <NavLink to="/about" label="About" active={location.pathname === '/about'} />
      </nav>
      
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1.5 text-sm rounded-full bg-secondary/80 hover:bg-secondary/100 transition-colors duration-200">
          Sign In
        </button>
      </div>
    </header>
  );
};

const NavLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link 
    to={to}
    className={cn(
      "text-sm font-medium transition-all duration-200 relative",
      active ? "text-primary" : "text-foreground/80 hover:text-foreground"
    )}
  >
    {label}
    {active && (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
    )}
  </Link>
);

export default Navbar;
