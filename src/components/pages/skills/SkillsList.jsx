import React from "react";
import { Terminal } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export const SkillsList = ({ skills }) => {
  const handleScroll = (e) => {
    e.stopPropagation();
  };
  const { theme } = useTheme();

  return (
    <div className="w-96" onWheel={handleScroll}>
      <div className={`rounded-xl p-4 bg-transparent relative overflow-hidden
        ${theme === 'dark' 
          ? 'bg-zinc-800/10 backdrop-blur-xl' 
          : 'bg-slate-100/40 backdrop-blur-xl'
        }
        border
        ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}
        transition-all duration-300 ease-in-out`}>
        
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className={`text-base font-bold tracking-tight
            ${theme === 'dark' ? 'text-zinc-50' : 'text-slate-900'}`}>
            Skills Library
          </h3>
          <Terminal className={`w-5 h-5 
            ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`}/>
        </div>

        <div className={`overflow-y-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          ${theme === 'dark' 
            ? '[&::-webkit-scrollbar-thumb]:bg-zinc-400/30 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400/50'
            : '[&::-webkit-scrollbar-thumb]:bg-slate-400/30 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/50'
          }
          scrollbar-gutter-stable
          pr-1`}
          onScroll={(e) => e.stopPropagation()}>
          
          <div className="grid grid-cols-3 gap-2 px-2">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center min-h-24 p-2 group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`w-8 h-8 object-contain transition-all duration-300 
                      group-hover:scale-110 icon-tilt`}
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  />
                </div>
                
                <span className={`text-sm font-medium text-center truncate w-full
                  ${theme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}
                `}>
                  {skill.name}
                </span>
                {skill.level && (
                  <span className={`text-xs mt-1
                    ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}
                  `}>
                    {skill.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsList;