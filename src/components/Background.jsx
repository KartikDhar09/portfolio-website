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

  // Get number of shapes based on screen size
  const getTotalShapes = () => {
    if (window.innerWidth <= 640) return 10; // Mobile
    if (window.innerWidth <= 768) return 20; // Tablet
    return 30; // Desktop
  };

  // Get shape size based on screen size
  const getShapeSize = () => {
    if (window.innerWidth <= 640) return () => Math.random() * 200 + 50; // Smaller shapes on mobile
    if (window.innerWidth <= 768) return () => Math.random() * 300 + 75; // Medium shapes on tablet
    return () => Math.random() * 400 + 100; // Larger shapes on desktop
  };

  // Generate shapes with different animations
  const shapes = useMemo(() => {
    const totalShapes = getTotalShapes();
    const sizeGenerator = getShapeSize();

    return Array.from({ length: totalShapes }).map((_, i) => {
      const size = sizeGenerator();
      const colorIndex = Math.floor(Math.random() * colorPalettes.length);

      // Different animation patterns
      const animations = [
        `float-linear ${window.innerWidth <= 640 ? 15 : 20 + Math.random() * 20}s infinite linear`,
        `float-bounce ${window.innerWidth <= 640 ? 20 : 25 + Math.random() * 20}s infinite ease-in-out`,
        `float-circular ${window.innerWidth <= 640 ? 25 : 30 + Math.random() * 20}s infinite ease-in-out`
      ];

      const animationIndex = Math.floor(Math.random() * animations.length);

      return {
        size,
        color: colorPalettes[colorIndex],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: animations[animationIndex],
        delay: `-${Math.random() * 30}s`,
        blur: Math.random() > (window.innerWidth <= 640 ? 0.7 : 0.5), // Less blur on mobile for performance
      };
    });
  }, [colorPalettes]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-700">
        {shapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-colors duration-700
              ${window.innerWidth <= 640 ? 'mix-blend-normal' : 'mix-blend-multiply dark:mix-blend-screen'}
              ${shape.blur ? (window.innerWidth <= 640 ? 'backdrop-blur-xl' : 'backdrop-blur-3xl') : ''}`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: shape.left,
              top: shape.top,
              background: shape.color,
              animation: shape.animation,
              animationDelay: shape.delay,
              opacity: window.innerWidth <= 640 ? 0.7 : 1, // Reduce opacity on mobile for better performance
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
