
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type TechTerm, techTerms } from '@/utils/data';
import { ChevronRightIcon } from 'lucide-react';
import { highlightKeywords } from '@/utils/highlight';

interface TermCardProps {
  term: TechTerm;
  index: number;
}

const TermCard = ({ term, index }: TermCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/term/${term.id}`}
        className="block h-full group"
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

export default TermCard;
