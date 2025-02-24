import React, { useMemo, memo } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { skills } from './skills.js';
import { SkillSection } from './SkillSection.jsx';

// Constant styles
const CONTAINER_BASE_STYLES = "min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)] bg-transparent transition-all duration-500 flex flex-col";
const INNER_CONTAINER_STYLES = "container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 max-w-7xl flex flex-col";
const SECTION_STYLES = "rounded-xl sm:rounded-3xl bg-transparent backdrop-blur-0 p-4 md:p-6 lg:p-8 flex flex-col";
const HEADING_STYLES = "text-3xl sm:text-4xl lg:text-5xl p-2 font-black bg-clip-text text-transparent bg-gradient-to-r";
const DESCRIPTION_STYLES = "text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-center font-medium text-transparent bg-clip-text bg-gradient-to-r";

const SkillsHeader = memo(({ headingGradient }) => (
  <h2 className={`${HEADING_STYLES} ${headingGradient}`}>
    Technical Skills
  </h2>
));

const SkillsDescription = memo(({ descriptionGradient }) => (
  <p className={`${DESCRIPTION_STYLES} ${descriptionGradient}`}>
    Expertise in Modern Web Technologies
  </p>
));

export const Skills = () => {
  const { theme } = useTheme();

  const themeStyles = useMemo(() => ({
    text: theme === 'dark' ? 'text-zinc-100' : 'text-slate-900',
    headingGradient: theme === 'dark'
      ? 'from-slate-300 via-zinc-300 to-slate-400'
      : 'from-slate-600 via-slate-700 to-zinc-800',
    descriptionGradient: theme === 'dark'
      ? 'from-zinc-200 to-zinc-400'
      : 'from-slate-700 to-slate-900'
  }), [theme]);

  return (
    <div className={`${CONTAINER_BASE_STYLES} ${themeStyles.text}`}>
      <div className={INNER_CONTAINER_STYLES}>
        <div className={SECTION_STYLES}>
          <div className="text-center mb-8">
            <div className="flex flex-row items-center justify-center space-x-2 mb-2">
              <SkillsHeader headingGradient={themeStyles.headingGradient} />
            </div>

            <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent">
              <SkillsDescription descriptionGradient={themeStyles.descriptionGradient} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto pb-16">
              <SkillSection skills={skills} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};