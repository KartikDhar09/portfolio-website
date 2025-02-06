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
                  ? "bg-gradient-to-b from-zinc-400/80 via-zinc-300/50 to-zinc-400/80"
                  : "bg-gradient-to-b from-slate-400/90 via-slate-300 to-slate-400/90"
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
                border-2
                ${
                  isVisible
                    ? theme === "dark"
                      ? "bg-gradient-to-br from-zinc-200 to-zinc-400 border-zinc-300 shadow-[0_0_10px_rgba(244,244,245,0.3)]"
                      : "bg-gradient-to-br from-slate-500 to-slate-700 border-slate-400 shadow-[0_0_10px_rgba(51,65,85,0.3)]"
                    : "scale-0"
                }
              `}
            />

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
                    ? "bg-zinc-800/30 border border-zinc-700/30 hover:bg-zinc-800/50"
                    : "bg-slate-50/20 border border-slate-200/50 hover:bg-slate-50/40"
                }
                ${
                  hoveredIndex === index
                    ? "scale-110 shadow-xl z-20"
                    : hoveredIndex !== null
                    ? "scale-95 opacity-20"
                    : "scale-100 shadow-lg"
                }
              `}
            >
              <div className="flex items-center mb-1">
                <IconComponent
                  className={`
                    mr-2 
                    w-5 
                    h-5 
                    transition-transform
                    duration-300
                    ${iconClasses}
                    ${hoveredIndex === index ? "scale-110" : ""}
                  `}
                />
                <h4
                  className={`
                    text-sm
                    font-semibold 
                    transition-all
                    duration-300
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
                  transition-all
                  duration-300
                  ${theme === "dark" 
                    ? hoveredIndex === index 
                      ? "text-zinc-200" 
                      : "text-zinc-400"
                    : hoveredIndex === index
                      ? "text-slate-900"
                      : "text-slate-600"
                  }
                `}
              >
                {item.company || item.institution}
              </p>
              <p
                className={`
                  text-xs 
                  mb-1 
                  transition-all
                  duration-300
                  ${theme === "dark"
                    ? hoveredIndex === index
                      ? "text-zinc-300"
                      : "text-zinc-500"
                    : hoveredIndex === index
                      ? "text-slate-700"
                      : "text-slate-500"
                  }
                `}
              >
                {item.duration}
              </p>
              <div className="relative">
                <p
                  className={`
                    text-xs 
                    mb-1
                    transition-all
                    duration-300
                    ${theme === "dark"
                      ? hoveredIndex === index
                        ? "text-zinc-100"
                        : "text-zinc-300"
                      : hoveredIndex === index
                        ? "text-slate-900"
                        : "text-slate-700"
                    }
                  `}
                >
                  {truncateText(item.description)}
                  {item.description && (
                    <span className={`
                      text-xs
                      ml-1
                      transition-all
                      duration-300
                      ${theme === "dark"
                        ? hoveredIndex === index
                          ? "text-zinc-200"
                          : "text-zinc-400"
                        : hoveredIndex === index
                          ? "text-slate-600"
                          : "text-slate-400"
                      }
                    `}>
                      read more
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

       <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className={`
          sm:max-w-[600px]
          backdrop-blur-md
          border
          shadow-2xl
          transition-all
          duration-200
          ${theme === "dark" 
            ? "bg-zinc-900/30 border-zinc-700/30" 
            : "bg-slate-50/30 border-slate-200/30"}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <IconComponent className={`
                w-8 
                h-8 
                ${iconClasses}
                transition-opacity
                ${theme === "dark" ? "opacity-90" : "opacity-80"}
              `} />
              <div className="flex flex-col">
                <h3 className={`
                  text-2xl 
                  font-bold 
                  ${theme === "dark" 
                    ? "text-zinc-100" 
                    : "text-slate-900"}
                `}>
                  {selectedItem?.role || selectedItem?.degree}
                </h3>
                <p className={`
                  text-lg 
                  font-medium 
                  mt-1
                  ${theme === "dark" 
                    ? "text-zinc-200" 
                    : "text-slate-800"}
                `}>
                  {selectedItem?.company || selectedItem?.institution}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <div className={`
              mb-4 
              px-4 
              py-2 
              rounded-lg 
              inline-block
              ${theme === "dark" 
                ? "text-zinc-200" 
                : "text-slate-800"}
            `}>
              <p className="text-sm font-medium">
                {selectedItem?.duration}
              </p>
            </div>
            <div className="space-y-4">
              <p className={`
                text-base 
                leading-relaxed
                ${theme === "dark" 
                  ? "text-zinc-100" 
                  : "text-slate-900"}
              `}>
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