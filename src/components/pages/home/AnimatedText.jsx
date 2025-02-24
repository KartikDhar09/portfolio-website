import React, { useState, useCallback, useEffect, memo } from "react";

const AnimatedLetter = memo(({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const calculateRandomPosition = useCallback(() => {
    const baseDistance = Math.min(window.innerWidth / 10, 100);
    return {
      x: (Math.random() - 0.5) * baseDistance,
      y: (Math.random() - 0.5) * baseDistance
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const animate = () => {
      if (!mounted) return;
      
      setPosition(calculateRandomPosition());
      
      // Return to center
      const returnTimer = setTimeout(() => {
        if (!mounted) return;
        setPosition({ x: 0, y: 0 });
      }, 500);

      // Schedule next animation
      const cycleTimer = setTimeout(animate, 2500);

      return () => {
        clearTimeout(returnTimer);
        clearTimeout(cycleTimer);
      };
    };

    // Initial random delay
    const initialTimer = setTimeout(animate, Math.random() * 1000);

    return () => {
      mounted = false;
      clearTimeout(initialTimer);
    };
  }, [calculateRandomPosition]);

  return (
    <span
      className="inline-block transition-all duration-500"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children === ' ' ? '\u00A0' : children}
    </span>
  );
});

const AnimatedText = memo(({ text }) => (
  <div className="flex flex-wrap justify-center">
    {text.split('').map((letter, index) => (
      <AnimatedLetter key={`${letter}-${index}`}>{letter}</AnimatedLetter>
    ))}
  </div>
));

AnimatedLetter.displayName = 'AnimatedLetter';
AnimatedText.displayName = 'AnimatedText';

export default AnimatedText;