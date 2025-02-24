import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

//  Timeline Card component
const TimelineCard = memo(({ 
  item, 
  index, 
  isVisible, 
  hoveredIndex, 
  expandedIndex, 
  theme,
  titleClasses,
  onHover, 
  onClick 
}) => {
  const getDescriptionTruncation = useCallback(() => {
    if (window.innerWidth <= 640) return 8;
    if (window.innerWidth <= 768) return 12;
    return 15;
  }, []);

  const cardStyle = {
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  };

  const baseCardClasses = `
    w-full md:w-[calc(100%-1.5rem)] lg:w-[calc(100%-2rem)]
    md:ml-6 lg:ml-8 xl:ml-10
    p-2 md:p-2.5 lg:p-3 xl:p-4
    rounded-lg
    transition-all
    duration-300
    cursor-pointer
  `;

  const visibilityClasses = isVisible 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-4";

  const themeClasses = theme === "dark"
    ? "bg-zinc-800/30 backdrop-blur-md backdrop-filter hover:bg-zinc-800/40 border-white/10"
    : "bg-white/30 backdrop-blur-md backdrop-filter hover:bg-white/40 border-black/10";

  const hoverClasses = hoveredIndex === index
    ? "shadow-lg shadow-black/5 transform scale-[1.01] z-20"
    : hoveredIndex !== null
      ? "opacity-75"
      : "shadow-sm";

  return (
    <motion.div
      layout
      onClick={() => onClick(index)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`
        ${baseCardClasses}
        ${visibilityClasses}
        ${themeClasses}
        ${hoverClasses}
        border
      `}
      style={cardStyle}
    >
      <TimelineContent 
        item={item}
        index={index}
        expandedIndex={expandedIndex}
        hoveredIndex={hoveredIndex}
        theme={theme}
        titleClasses={titleClasses}
        getDescriptionTruncation={getDescriptionTruncation}
      />
    </motion.div>
  );
});

//  Timeline Content component
const TimelineContent = memo(({
  item,
  index,
  expandedIndex,
  hoveredIndex,
  theme,
  titleClasses,
  getDescriptionTruncation
}) => (
  <motion.div layout className="flex items-start sm:items-center justify-between gap-2 sm:gap-3">
    <div className="flex-1 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <motion.div
          layout
          initial={{ rotate: 0 }}
          animate={{ rotate: expandedIndex === index ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 md:gap-3 lg:gap-4 min-w-0">
          <motion.h4
            layout
            className={`
              ${titleClasses}
              font-bold
              text-sm md:text-base lg:text-lg
              leading-tight
              truncate
              max-w-full
            `}
          >
            {item.role || item.degree}
          </motion.h4>

          <motion.span
            layout
            className={`
              text-xs md:text-sm lg:text-base
              whitespace-nowrap
              truncate
              ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}
            `}
          >
            {item.duration}
          </motion.span>
        </div>
      </div>

      <TimelineDescription 
        item={item}
        index={index}
        expandedIndex={expandedIndex}
        hoveredIndex={hoveredIndex}
        theme={theme}
        getDescriptionTruncation={getDescriptionTruncation}
      />
    </div>
  </motion.div>
));

//  Timeline Description component
const TimelineDescription = memo(({
  item,
  index,
  expandedIndex,
  hoveredIndex,
  theme,
  getDescriptionTruncation
}) => (
  <>
    <motion.p
      layout
      className={`
        text-xs md:text-sm lg:text-base
        font-medium
        mt-1 mb-1
        truncate
        ${theme === "dark"
          ? hoveredIndex === index ? "text-zinc-200" : "text-zinc-300"
          : hoveredIndex === index ? "text-slate-900" : "text-slate-700"}
      `}
    >
      {item.company || item.institution}
    </motion.p>

    <AnimatePresence initial={false}>
      {item.description && (
        <motion.div
          key={`description-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: expandedIndex === index ? "auto" : "auto",
            opacity: 1
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <motion.p
            className={`
              text-xs md:text-sm lg:text-base
              leading-relaxed
              ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}
              ${expandedIndex === index ? "mt-2" : ""}
            `}
          >
            {expandedIndex === index ? (
              item.description
            ) : (
              <>
                {item.description.split(' ').slice(0, getDescriptionTruncation()).join(' ')}
                {item.description.split(' ').length > getDescriptionTruncation() && '...'}
                <ExpandButton theme={theme} />
              </>
            )}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  </>
));

//  Expand Button component
const ExpandButton = memo(({ theme }) => (
  <span
    className={`
      ml-1
      font-medium
      inline-block
      ${theme === "dark"
        ? "text-zinc-400 hover:text-zinc-300"
        : "text-slate-400 hover:text-slate-500"}
    `}
  >
    <motion.span
      animate={{ y: [0, 2, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-block"
    >
      read more↓
    </motion.span>
  </span>
));

// Timeline Dot component
const TimelineDot = memo(({ isVisible, hoveredIndex, index, theme }) => {
  const dotColor = theme === "dark"
    ? hoveredIndex === index ? "bg-zinc-100" : "bg-zinc-200"
    : hoveredIndex === index ? "bg-slate-800" : "bg-slate-600";

  return (
    <div className={`
      absolute left-3 md:left-3.5 lg:left-4
      top-6 transform -translate-x-1/2 -translate-y-1/2
      transition-all duration-500
      ${isVisible ? "opacity-100" : "opacity-0"}
      z-10
      hidden md:block
    `}>
      <div className={`
        relative
        w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5
        rounded-full
        ${dotColor}
        transition-all duration-300
        shadow-md
        ${hoveredIndex === index ? "scale-125" : "scale-100"}
      `}>
        <div className={`
          absolute -inset-1
          rounded-full
          ${theme === "dark" ? "bg-zinc-400" : "bg-slate-400"}
          opacity-0
          ${hoveredIndex === index ? "animate-ping" : ""}
        `} />
      </div>
    </div>
  );
});

//  Timeline Section component
export const TimelineSection = ({ items, theme, titleClasses }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  const handleCardHover = useCallback((index) => {
    if (!(window.innerWidth <= 640)) setHoveredIndex(index);
  }, []);

  const handleCardClick = useCallback((index) => {
    if (items[index].description) {
      setExpandedIndex(prev => prev === index ? null : index);
    }
  }, [items]);

  const getLineColor = useCallback((index) => {
    if (theme === "dark") {
      return hoveredIndex === index || hoveredIndex === index + 1
        ? "bg-zinc-400"
        : "bg-zinc-600";
    }
    return hoveredIndex === index || hoveredIndex === index + 1
      ? "bg-slate-400"
      : "bg-slate-300";
  }, [hoveredIndex, theme]);

  return (
    <div
      ref={timelineRef}
      className="relative w-full max-w-[95rem] mx-auto py-2 px-2 md:py-3 md:px-3 lg:py-4 lg:px-4"
    >
      <div className="grid gap-2 md:gap-3 lg:gap-4 xl:gap-6">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {index < items.length - 1 && (
              <div
                className={`
                  absolute left-3 md:left-3.5 lg:left-4
                  top-6 w-0.5 h-[calc(100%+0.5rem)]
                  ${getLineColor(index)}
                  transition-all duration-500
                  ${isVisible ? "opacity-100" : "opacity-0"}
                  hidden md:block
                `}
              />
            )}

            <TimelineDot 
              isVisible={isVisible}
              hoveredIndex={hoveredIndex}
              index={index}
              theme={theme}
            />

            <TimelineCard
              item={item}
              index={index}
              isVisible={isVisible}
              hoveredIndex={hoveredIndex}
              expandedIndex={expandedIndex}
              theme={theme}
              titleClasses={titleClasses}
              onHover={handleCardHover}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};