
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type TechTerm } from '@/utils/data';
import { ChevronRightIcon } from 'lucide-react';
import { highlightKeywords } from '@/utils/highlight';
import { Skeleton } from '@/components/ui/skeleton';

interface TermCardProps {
  term: TechTerm;
  index: number;
  onClick?: () => void;
}

const TermCard = ({ term, index, onClick }: TermCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate content loading for better visual feedback
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100 + index * 50); // Stagger loading for visual effect
    
    return () => clearTimeout(timer);
  }, [index]);
  
  if (!isLoaded) {
    return <TermCardSkeleton />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/term/${term.id}`}
        className="block h-full group"
        onClick={onClick}
      >
        <div className="h-full p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-all duration-300 shadow-soft hover:shadow-medium">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block py-1 px-2.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                {term.category}
              </span>
              <ChevronRightIcon 
                className={`w-5 h-5 text-primary transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
              />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
              {term.term}
            </h3>
            
            <p 
              className="text-muted-foreground text-sm flex-grow"
              dangerouslySetInnerHTML={{ __html: highlightKeywords(term.description) }}
            />
            
            <div 
              className={`mt-4 text-sm font-medium text-primary flex items-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
            >
              <span>Read more</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const TermCardSkeleton = () => (
  <div className="h-full p-6 rounded-xl bg-card border border-border/20 shadow-soft">
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/5 mb-2" />
      <div className="mt-auto pt-4">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export default TermCard;
