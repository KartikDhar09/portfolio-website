import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const COLOR_PALETTES = {
  light: [
    'rgba(147, 197, 253, 0.15)', // blue
    'rgba(167, 139, 250, 0.15)', // purple
    'rgba(252, 165, 165, 0.15)', // red
    'rgba(110, 231, 183, 0.15)', // green
    'rgba(251, 146, 60, 0.15)',  // orange
    'rgba(244, 114, 182, 0.15)', // pink
  ],
  dark: [
    'rgba(30, 64, 175, 0.15)',   // dark blue
    'rgba(109, 40, 217, 0.15)',  // dark purple
    'rgba(153, 27, 27, 0.15)',   // dark red
    'rgba(6, 95, 70, 0.15)',     // dark green
    'rgba(154, 52, 18, 0.15)',   // dark orange
    'rgba(157, 23, 77, 0.15)',   // dark pink
  ]
};

const SCREEN_CONFIGS = {
  small: { maxWidth: 640, shapes: 10, sizeRange: [50, 250] },
  medium: { maxWidth: 768, shapes: 20, sizeRange: [75, 375] },
  large: { shapes: 30, sizeRange: [100, 500] }
};

const ANIMATIONS = {
  small: {
    linear: 'float-linear 15s infinite linear',
    bounce: 'float-bounce 20s infinite ease-in-out',
    circular: 'float-circular 25s infinite ease-in-out'
  },
  large: {
    linear: duration => `float-linear ${20 + duration}s infinite linear`,
    bounce: duration => `float-bounce ${25 + duration}s infinite ease-in-out`,
    circular: duration => `float-circular ${30 + duration}s infinite ease-in-out`
  }
};

export const Background = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Debounced window resize handler
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowWidth(window.innerWidth), 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  //  screen config based on window width
  const screenConfig = useMemo(() => {
    if (windowWidth <= SCREEN_CONFIGS.small.maxWidth) return SCREEN_CONFIGS.small;
    if (windowWidth <= SCREEN_CONFIGS.medium.maxWidth) return SCREEN_CONFIGS.medium;
    return SCREEN_CONFIGS.large;
  }, [windowWidth]);

  //  random size within range
  const getRandomSize = ([min, max]) => min + Math.random() * (max - min);

  //  shapes 
  const shapes = useMemo(() => {
    const { shapes: totalShapes, sizeRange } = screenConfig;
    const isSmallScreen = windowWidth <= SCREEN_CONFIGS.small.maxWidth;
    const animations = isSmallScreen ? ANIMATIONS.small : ANIMATIONS.large;
    const colorPalette = COLOR_PALETTES[theme];

    return Array.from({ length: totalShapes }, () => {
      const animationKeys = Object.keys(animations);
      const animationType = animationKeys[Math.floor(Math.random() * animationKeys.length)];
      const animationDuration = Math.random() * 20;

      return {
        size: getRandomSize(sizeRange),
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        position: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        },
        animation: isSmallScreen 
          ? animations[animationType]
          : animations[animationType](animationDuration),
        delay: `-${Math.random() * 30}s`,
        blur: Math.random() > (isSmallScreen ? 0.7 : 0.5)
      };
    });
  }, [screenConfig, theme, windowWidth]);

  const getShapeClassName = (isSmallScreen, hasBlur) => {
    const baseClass = 'absolute rounded-full transition-colors duration-700';
    const blendClass = isSmallScreen 
      ? 'mix-blend-normal' 
      : 'mix-blend-multiply dark:mix-blend-screen';
    const blurClass = hasBlur 
      ? isSmallScreen ? 'backdrop-blur-xl' : 'backdrop-blur-3xl'
      : '';
    
    return `${baseClass} ${blendClass} ${blurClass}`.trim();
  };

  const isSmallScreen = windowWidth <= SCREEN_CONFIGS.small.maxWidth;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-700">
        {shapes.map((shape, index) => (
          <div
            key={`shape-${index}`}
            className={getShapeClassName(isSmallScreen, shape.blur)}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: shape.position.left,
              top: shape.position.top,
              background: shape.color,
              animation: shape.animation,
              animationDelay: shape.delay,
              opacity: isSmallScreen ? 0.7 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};