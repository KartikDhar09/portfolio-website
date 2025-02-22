import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { CodeSquare } from 'lucide-react';
import { skills } from './skills.js';
import { SkillSection } from './SkillSection.jsx';

export const Skills = () => {
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
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 max-w-7xl flex flex-col">
        <div className={`
          rounded-xl sm:rounded-3xl
          bg-transparent backdrop-blur-0
          p-4 md:p-6 lg:p-8
          flex
          flex-col
        `}>
          <div className="text-center mb-8">
            <div className="flex flex-row items-center justify-center space-x-2 mb-2">
              <h2 className={`
                text-3xl sm:text-4xl lg:text-5xl
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
                Technical Skills
              </h2>
              <CodeSquare
                className={`
                  w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10
                  ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}
                `}
              />
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent">
              <p className={`
                text-sm sm:text-base lg:text-lg
                leading-relaxed
                tracking-wide
                text-center
                font-medium
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-slate-700
                to-slate-900
                dark:from-zinc-200
                dark:to-zinc-400
              `}>
                Expertise in Modern Web Technologies
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
              <div className="pb-16">
                <SkillSection
                  skills={skills}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;