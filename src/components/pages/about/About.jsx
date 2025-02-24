import React, { memo } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { experiences } from "./experiences.js";
import { educationDetails } from "./educationDetails.js";
import { TimelineSection } from "./TimelineSection.jsx";

// Header Component
const Header = memo(( ) => (
  <div className="w-full sm:w-11/12 md:w-10/12 p-3 sm:p-4 rounded-3xl">
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl p-2 font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-600 via-slate-700 to-zinc-800 dark:from-slate-300 dark:via-zinc-300 dark:to-slate-400">
        About My Journey
      </h2>
    </div>

    <div className="p-2 sm:p-3 md:p-4 rounded-2xl border border-transparent">
      <div className="flex flex-col space-y-2 sm:space-y-3">
        <p className="text-sm md:text-base lg:text-lg text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-200 dark:to-zinc-400">
          Transforming design dreams into digital realities, one line of code at a time.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-center font-bold">
          Always learning!
        </p>
      </div>
    </div>
  </div>
));

// Section Title Component
const SectionTitle = memo(({ icon: Icon, title, theme }) => (
  <div className="flex items-center justify-center mb-3 sm:mb-4 space-x-2 sm:space-x-3">
    <Icon
      className={`w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 ${
        theme === "dark" ? "text-zinc-400" : "text-slate-600"
      }`}
    />
    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-zinc-200 dark:to-zinc-400">
      {title}
    </h3>
  </div>
));

// Timeline Container Component
const TimelineContainer = memo(({ icon, title, items, theme }) => {
  const titleClasses = `
    transition-colors duration-300 break-words text-sm md:text-base lg:text-lg
    ${theme === "dark"
      ? "text-zinc-200 hover:text-zinc-400"
      : "text-slate-800 hover:text-slate-600"
    }
  `;

  return (
    <div className="rounded-3xl p-3 sm:p-4 w-full">
      <SectionTitle icon={icon} title={title} theme={theme} />
      <TimelineSection
        items={items}
        theme={theme}
        titleClasses={titleClasses}
      />
    </div>
  );
});

export const About = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        w-full pt-4 px-3 sm:px-4 md:px-6 
        flex flex-col items-center justify-start
        relative bg-transparent
        min-h-[calc(100dvh-64px)] pb-16
        md:min-h-[calc(100dvh-80px)]  
        ${theme === "dark" ? "text-zinc-100" : "text-slate-900"}
      `}
    >
      <div className="container mx-auto relative z-10 w-full max-w-6xl flex flex-col items-center">
        <Header theme={theme} />
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-3xl mx-auto mt-4">
          <TimelineContainer
            icon={Briefcase}
            title="Experience"
            items={experiences}
            theme={theme}
          />
          
          <TimelineContainer
            icon={GraduationCap}
            title="Education"
            items={educationDetails}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};