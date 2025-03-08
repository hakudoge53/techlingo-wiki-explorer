
import { useEffect, useRef } from 'react';
import { useRevealAnimation } from '@/utils/animations';
import { motion } from 'framer-motion';

const Hero = () => {
  const { ref: headingRef, isVisible: isHeadingVisible } = useRevealAnimation();
  const { ref: textRef, isVisible: isTextVisible } = useRevealAnimation();
  const { ref: ctaRef, isVisible: isCtaVisible } = useRevealAnimation();
  
  // Create a ref for the 3D object
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background z-0"></div>
      
      {/* 3D Elements */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-60"
      >
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-blue-300/10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 px-6 md:px-8 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div 
            ref={headingRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-1000 delay-300 transform ${
              isHeadingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block py-1 px-3 mb-6 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
              TECHNOLOGY SIMPLIFIED
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Demystifying <span className="text-primary">Tech Terminology</span> for Everyone
            </h1>
          </div>
          
          <div 
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`mt-6 transition-all duration-1000 delay-500 transform ${
              isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-lg text-muted-foreground">
              Your essential guide to understanding the complex world of technology. Explore our comprehensive glossary of tech terms, explained in clear, accessible language.
            </p>
          </div>
          
          <div 
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`mt-10 flex flex-wrap gap-4 transition-all duration-1000 delay-700 transform ${
              isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a 
              href="#explore" 
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-soft"
            >
              Explore Terms
            </a>
            <a 
              href="#categories" 
              className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              Browse Categories
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-5 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
