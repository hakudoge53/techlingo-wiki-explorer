
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type TechTerm } from '@/utils/types';
import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TermCardProps {
  term: TechTerm;
  index: number;
  onClick?: () => void;
  compact?: boolean;
}

const TermCard = ({ term, index, onClick, compact = false }: TermCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50 + Math.min(index, 10) * 30); // Faster loading with a cap for many terms
    
    return () => clearTimeout(timer);
  }, [index]);
  
  if (!isLoaded) {
    return compact ? <CompactTermSkeleton /> : <TermCardSkeleton />;
  }
  
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index, 20) * 0.02 }} // Faster animations for many items
        className="w-full"
      >
        <button 
          className="w-full text-left p-2 rounded-md hover:bg-secondary/50 transition-colors"
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-base">{term.term}</span>
              <span className="ml-2 text-xs text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded-full">
                {term.category}
              </span>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      </motion.div>
    );
  }

  // Original card view for the cases where we need it
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className="block w-full h-full text-left group"
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
            
            <p className="text-muted-foreground text-sm flex-grow">
              {term.description}
            </p>
            
            <div className="mt-4 flex justify-between items-center">
              <div 
                className={`text-sm font-medium text-primary flex items-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
              >
                <span>Read more</span>
              </div>
              
              {term.url && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={term.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open external resource</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </button>
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

const CompactTermSkeleton = () => (
  <div className="w-full p-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Skeleton className="h-5 w-20 mr-2" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
  </div>
);

export default TermCard;
