
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTermById, getRelatedTerms, type TechTerm } from '@/utils/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeftIcon, BookOpenIcon, LinkIcon, HashIcon } from 'lucide-react';

const TermDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [term, setTerm] = useState<TechTerm | undefined>(undefined);
  const [relatedTerms, setRelatedTerms] = useState<TechTerm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Simulate loading
      setIsLoading(true);
      setTimeout(() => {
        const foundTerm = getTermById(id);
        setTerm(foundTerm);
        
        if (foundTerm) {
          setRelatedTerms(getRelatedTerms(foundTerm));
        }
        
        setIsLoading(false);
        
        // Scroll to top when term changes
        window.scrollTo(0, 0);
      }, 300);
    }
  }, [id]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-24 bg-secondary rounded-full mb-6"></div>
              <div className="h-12 w-3/4 bg-secondary rounded-lg mb-8"></div>
              <div className="h-6 w-full bg-secondary rounded-lg mb-4"></div>
              <div className="h-6 w-5/6 bg-secondary rounded-lg mb-4"></div>
              <div className="h-6 w-full bg-secondary rounded-lg mb-8"></div>
              <div className="h-40 w-full bg-secondary rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Term not found
  if (!term) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-8 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Term Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The term you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center py-1 px-3 rounded-full bg-secondary/70 text-secondary-foreground text-sm mb-8 hover:bg-secondary transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 mr-1.5" />
            Back to glossary
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-block py-1 px-3 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
              {term.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{term.term}</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {term.description}
          </p>
          
          <div className="p-8 rounded-xl bg-secondary/20 border border-border/50 mb-10">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <BookOpenIcon className="w-5 h-5 mr-2 text-primary" />
              Detailed Explanation
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              {term.longDescription}
            </p>
            
            {term.examples && term.examples.length > 0 && (
              <div className="mt-6">
                <h3 className="flex items-center text-lg font-semibold mb-3">
                  <HashIcon className="w-4 h-4 mr-2 text-primary" />
                  Examples
                </h3>
                <ul className="space-y-2 pl-4">
                  {term.examples.map((example, index) => (
                    <li key={index} className="text-foreground/90">
                      <span className="block p-3 bg-background rounded-lg border border-border/50">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {relatedTerms.length > 0 && (
            <div className="mb-16">
              <h2 className="flex items-center text-xl font-semibold mb-6">
                <LinkIcon className="w-5 h-5 mr-2 text-primary" />
                Related Terms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTerms.map((relatedTerm) => (
                  <Link 
                    key={relatedTerm.id}
                    to={`/term/${relatedTerm.id}`}
                    className="p-4 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/10 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {relatedTerm.term}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedTerm.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermDetail;
