import React from 'react';
import { Boxes } from "lucide-react";
import { ProjectCard } from './ProjectCard.jsx';
import { projects } from "./projects.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export const Projects = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}
        min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)]
        bg-transparent
        transition-all
        duration-500
        flex
        flex-col
        items-center
        py-4
        pb-20  // Add padding to the bottom to account for the navbar height
      `}
    >
      <div className="container mx-auto px-4 flex flex-col h-full w-full max-w-7xl">
        <div className={`
          rounded-xl sm:rounded-3xl
          bg-transparent backdrop-blur-0
          p-2 md:p-4 lg:p-6
          flex
          flex-col
          h-full
          w-full
        `}>
          {/* Header Section */}
          <div className="text-center mb-8 flex items-center justify-center space-x-2">
            <h2 className={`
              text-3xl md:text-4xl lg:text-5xl
              p-2
              font-black
              bg-clip-text
              text-transparent
              bg-gradient-to-r
              from-slate-600
              via-slate-700
              to-zinc-800
              dark:from-slate-300
              dark:via-zinc-300
              dark:to-slate-400
            `}>
              My Projects
            </h2>
            <Boxes
              className={`
                w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10
                ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}
              `}
              strokeWidth={1.5}
            />
          </div>
          <div className="p-1 sm:p-2 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent mb-8">
            <p className={`
              text-sm md:text-base lg:text-lg
              leading-relaxed
              tracking-wide
              text-center
              font-medium
            `}>
              A showcase of my recent web development projects
            </p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto px-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className={`
                  flex
                  transform
                  transition-all
                  duration-300
                  hover:z-10
                  overflow-hidden
                `}
              >
                <div className={`
                  ${theme === 'dark'
                    ? 'hover:shadow-lg hover:shadow-zinc-800/50'
                    : 'hover:shadow-lg hover:shadow-slate-200/50'
                  }
                  flex-grow
                `}>
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

export default Projects;
