
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 mt-20 pt-10 pb-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="font-display text-xl font-medium">
            <span className="text-primary">Tech</span>Lingo
          </Link>
          <p className="mt-4 text-muted-foreground text-sm max-w-xs">
            A modern glossary of technology terms, designed to help you navigate the complex world of tech jargon.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:gap-4">
          <div>
            <h3 className="font-medium text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/glossary" label="Tech Glossary" />
              <FooterLink to="/categories" label="Categories" />
              <FooterLink to="/recent" label="Recent Terms" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/privacy" label="Privacy Policy" />
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3">Stay Updated</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Subscribe to our newsletter for the latest tech terms and definitions.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 text-sm rounded-l-md border border-border bg-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground font-medium rounded-r-md hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TechLingo. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
