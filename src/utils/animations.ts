
import { useEffect, useRef, useState } from 'react';

// Custom hook for reveal on scroll animations
export const useRevealAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Function to delay execution for animations
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Staggered animation for lists
export const useStaggeredAnimation = (items: any[], baseDelay = 100) => {
  return items.map((item, index) => ({
    ...item,
    animationDelay: `${index * baseDelay}ms`,
  }));
};
