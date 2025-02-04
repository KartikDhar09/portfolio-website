import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const TimelineSection = ({
  items,
  theme,
  iconComponent: IconComponent,
  titleClasses,
  iconClasses,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const truncateText = (text, wordLimit = 13) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  const handleCardClick = (item) => {
    if (item.description) {
      setSelectedItem(item);
      setShowDialog(true);
    }
  };

  return (
    <>
      <div ref={timelineRef} className="relative w-full py-2">
        {/* Vertical Line */}
        <div
          className={`
            absolute 
            left-1/2 
            transform 
            -translate-x-1/2 
            h-full 
            w-1 
            transition-all 
            duration-700 
            ${
              isVisible
                ? theme === "dark"
                  ? "bg-zinc-300/50"
                  : "bg-slate-300"
                : "bg-transparent"
            }
          `}
        />

        {items.map((item, index) => (
          <div
            key={index}
            className={`
              relative 
              flex 
              items-center 
              w-full 
              mb-4 
              ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}
              ${isVisible ? "opacity-100" : "opacity-0"}
              transition-all 
              duration-700 
              ease-in-out
            `}
          >
            {/* Timeline Dot */}
            <div
              className={`
                absolute 
                left-1/2 
                transform 
                -translate-x-1/2 
                w-5 
                h-5 
                rounded-full 
                z-10
                transition-all 
                duration-700
                ${
                  isVisible
                    ? theme === "dark"
                      ? "bg-zinc-100 shadow-lg"
                      : "bg-slate-600 shadow-md"
                    : "scale-0"
                }
              `}
            />

            {/* Item Card */}
            <div
              onClick={() => handleCardClick(item)}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardHover(null)}
              className={`
                w-[45%] 
                p-3 
                rounded-2xl 
                backdrop-blur-lg 
                shadow-lg 
                transform 
                transition-all 
                duration-500
                cursor-pointer
                hover:bg-opacity-90
                ${index % 2 === 0 ? "mr-auto" : "ml-auto"}
                ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : index % 2 === 0
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
                }
                ${
                  theme === "dark"
                    ? "bg-zinc-800/30 border border-zinc-700/30"
                    : "bg-slate-50/20 border border-slate-200/50"
                }
                ${
                  hoveredIndex === index
                    ? "scale-105 shadow-xl z-20"
                    : hoveredIndex !== null
                    ? "scale-95 opacity-70"
                    : "scale-100 shadow-lg"
                }
              `}
            >
              {/* Card content */}
              <div className="flex items-center mb-1">
                <IconComponent
                  className={`
                    mr-2 
                    w-5 
                    h-5 
                    ${iconClasses}
                  `}
                />
                <h4
                  className={`
                    text-sm
                    font-semibold 
                    ${titleClasses}
                  `}
                >
                  {item.role || item.degree}
                </h4>
              </div>
              <p
                className={`
                  text-xs 
                  mb-1
                  ${theme === "dark" ? "text-zinc-400" : "text-slate-600"}
                `}
              >
                {item.company || item.institution}
              </p>
              <p
                className={`
                  text-xs 
                  mb-1 
                  ${theme === "dark" ? "text-zinc-500" : "text-slate-500"}
                `}
              >
                {item.duration}
              </p>
              <div className="relative">
                <p
                  className={`
                    text-xs 
                    mb-1
                    ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}
                    transition-all
                    duration-300
                  `}
                >
                  {truncateText(item.description)}
                  {item.description && (
                    <span className="text-xs text-slate-400 dark:text-zinc-400 ml-1">
                      read more
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Dialog/Popup */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className={`
          sm:max-w-[600px]
          backdrop-blur-lg
          border-none
          shadow-xl
          ${theme === "dark" 
            ? "bg-zinc-900/90 text-zinc-100" 
            : "bg-slate-50/90 text-slate-900"}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <IconComponent className={`w-8 h-8 ${iconClasses}`} />
              <div>
                <h3 className={`
                  text-2xl font-bold bg-clip-text text-transparent 
                  ${theme === "dark"
                    ? "bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100"
                    : "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900"}
                `}>
                  {selectedItem?.role || selectedItem?.degree}
                </h3>
                <p className={`
                  text-lg font-medium mt-1
                  ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}
                `}>
                  {selectedItem?.company || selectedItem?.institution}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <div className={`
              mb-4 px-4 py-2 rounded-lg inline-block
              ${theme === "dark" ? "bg-zinc-800/50" : "bg-slate-100"}
            `}>
              <p className={`
                text-sm font-medium
                ${theme === "dark" ? "text-zinc-300" : "text-slate-700"}
              `}>
                {selectedItem?.duration}
              </p>
            </div>
            <div className={`
              p-4 rounded-xl
              
            `}>
              <p className="text-base leading-relaxed">
                {selectedItem?.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimelineSection;