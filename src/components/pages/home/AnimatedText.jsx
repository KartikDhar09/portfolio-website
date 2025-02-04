import React, { useState, useEffect } from "react";

 const AnimatedLetter = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const animationCycle = () => {
      const randomX = (Math.random() - 0.5) * 100;
      const randomY = (Math.random() - 0.5) * 100;
      setPosition({ x: randomX, y: randomY });

      setTimeout(() => {
        setPosition({ x: 0, y: 0 });
        setTimeout(animationCycle, 2000);
      }, 500);
    };

    const initialDelay = Math.random() * 1000;
    const timer = setTimeout(animationCycle, initialDelay);

    return () => clearTimeout(timer);
  }, []);

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
};

export const AnimatedText = ({ text }) => (
    <div className="flex">
      {text.split('').map((letter, index) => (
        <AnimatedLetter key={index}>{letter}</AnimatedLetter>
      ))}
    </div>
  );