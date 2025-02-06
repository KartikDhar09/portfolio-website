import React from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { Code2, Brain, Cpu } from 'lucide-react';
import { skills } from './skills.js';
import { GridSkills } from './GridSkills.jsx';
import { SkillsList } from './SkillsList.jsx';

const Skills = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'} h-screen bg-transparent transition-all duration-500 overflow-hidden`}>
      <div className="container mx-auto px-4 py-6 h-full">
        <div className="rounded-3xl bg-transparent backdrop-blur-lg p-8 h-full flex flex-col">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <Code2 className={`w-10 h-10  ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`} />
              <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
                Technical Skills
              </h2>
              <Brain className={`w-10 h-10  ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`} />
            </div>
            <div className="p-4 rounded-2xl backdrop-blur-lg border border-transparent">
              <p className="text-base md:text-lg leading-relaxed tracking-wide text-center font-medium">
                Expertise in Modern Web Technologies
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex h-full gap-8 justify-center items-center">
              <SkillsList skills={skills} theme={theme} />
              <div className="w-2/3 flex-1">
                <GridSkills skills={skills} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;