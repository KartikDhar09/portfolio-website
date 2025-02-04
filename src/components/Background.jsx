// src/components/Background.jsx
import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const Background = () => {
  const { theme } = useTheme();
  
  // Generate random color combinations for light and dark themes
  const colorPalettes = useMemo(() => {
    const lightPalette = [
      'rgba(147, 197, 253, 0.15)', // blue
      'rgba(167, 139, 250, 0.15)', // purple
      'rgba(252, 165, 165, 0.15)', // red
      'rgba(110, 231, 183, 0.15)', // green
      'rgba(251, 146, 60, 0.15)',  // orange
      'rgba(244, 114, 182, 0.15)', // pink
    ];
    
    const darkPalette = [
      'rgba(30, 64, 175, 0.15)',   // dark blue
      'rgba(109, 40, 217, 0.15)',  // dark purple
      'rgba(153, 27, 27, 0.15)',   // dark red
      'rgba(6, 95, 70, 0.15)',     // dark green
      'rgba(154, 52, 18, 0.15)',   // dark orange
      'rgba(157, 23, 77, 0.15)',   // dark pink
    ];
    
    return theme === 'dark' ? darkPalette : lightPalette;
  }, [theme]);

  // Generate shapes with different animations
  const shapes = useMemo(() => {
    const totalShapes = 30;
    return Array.from({ length: totalShapes }).map((_, i) => {
      const size = Math.random() * 400 + 100; // Larger shapes
      const colorIndex = Math.floor(Math.random() * colorPalettes.length);
      
      // Different animation patterns
      const animations = [
        `float-linear ${20 + Math.random() * 20}s infinite linear`,
        `float-bounce ${25 + Math.random() * 20}s infinite ease-in-out`,
        `float-circular ${30 + Math.random() * 20}s infinite ease-in-out`
      ];
      
      const animationIndex = Math.floor(Math.random() * animations.length);
      
      return {
        size,
        color: colorPalettes[colorIndex],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: animations[animationIndex],
        delay: `-${Math.random() * 30}s`,
        blur: Math.random() > 0.5,
      };
    });
  }, [colorPalettes]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-700">
        {shapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-700
              ${shape.blur ? 'backdrop-blur-3xl' : ''}`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: shape.left,
              top: shape.top,
              background: shape.color,
              animation: shape.animation,
              animationDelay: shape.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;