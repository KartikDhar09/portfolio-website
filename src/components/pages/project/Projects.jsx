import React from 'react';
import { useTheme } from "../../../context/ThemeContext.jsx";
import { ProjectCard } from './ProjectCard.jsx';
import { projects } from "./projects.js";

const containerStyles = "container mx-auto px-4 flex flex-col h-full w-full max-w-7xl";
const headerStyles = "text-3xl md:text-4xl lg:text-5xl p-2 font-black bg-clip-text text-transparent bg-gradient-to-r";
const descriptionStyles = "text-sm md:text-base lg:text-lg leading-relaxed tracking-wide text-center font-medium";
const gridStyles = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto px-4";

export const Projects = () => {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <div
      className={`
        ${isDark ? 'text-zinc-100' : 'text-slate-900'}
        min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)]
        bg-transparent transition-all duration-500
        flex flex-col items-center py-4 pb-20
      `}
    >
      <div className={containerStyles}>
        <div className="rounded-xl sm:rounded-3xl bg-transparent backdrop-blur-0 p-2 md:p-4 lg:p-6 flex flex-col h-full w-full">
          <div className="text-center mb-8 flex items-center justify-center space-x-2">
            <h2 
              className={`
                ${headerStyles}
                ${isDark 
                  ? 'from-slate-300 via-zinc-300 to-slate-400' 
                  : 'from-slate-600 via-slate-700 to-zinc-800'}
              `}
            >
              My Projects
            </h2>
          </div>

          <div className="p-1 sm:p-2 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent mb-8">
            <p className={descriptionStyles}>
              A showcase of my recent web development projects
            </p>
          </div>

          <div className={gridStyles}>
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex transform transition-all duration-300 hover:z-10 overflow-hidden"
              >
                <div 
                  className={`flex-grow ${
                    isDark
                      ? 'hover:shadow-lg hover:shadow-zinc-800/50'
                      : 'hover:shadow-lg hover:shadow-slate-200/50'
                  }`}
                >
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};