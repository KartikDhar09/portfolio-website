import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { navItems } from './navItems.js';

const Navbar = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <nav className="
        fixed top-1/2 -translate-y-1/2 left-4 
        max-h-[90vh] w-20 
        bg-transparent 
        backdrop-blur-xl rounded-2xl 
        border border-gray-200/50 dark:border-gray-700/50 
        z-40 
        flex flex-col 
        transition-all duration-500 
        shadow-lg dark:shadow-gray-950/50
      ">
        {/* Main content wrapper */}
        <div className="flex flex-col h-full pt-8 px-2">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="mb-8 text-center group relative hover:scale-110 transition-all duration-300"
          >
            <div className="
              w-14 h-14 mx-auto 
              bg-indigo-600
              rounded-xl 
              flex items-center justify-center 
              shadow-lg 
              group-hover:shadow-2xl group-hover:shadow-indigo-500/25 
              transition-all duration-300 
              relative overflow-hidden
            ">
              <span className="
                text-2xl font-bold text-white 
                group-hover:scale-110 
                transition-all duration-300 
                relative z-10
              ">
                KD
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-start space-y-4">
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      group flex items-center justify-center 
                      p-3 rounded-xl
                      transition-all duration-300
                      hover:scale-110
                      overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 dark:from-indigo-400/10 dark:via-violet-400/10 dark:to-purple-400/10'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <item.icon className={`
                          w-6 h-6 
                          transition-all duration-300
                          group-hover:scale-110
                          ${isActive 
                            ? 'text-indigo-600 dark:text-indigo-400 drop-shadow-lg'
                            : 'text-gray-600 dark:text-gray-400'
                          }
                        `}/>
                      </div>
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="
                    bg-gradient-to-br from-white/95 to-gray-50/95 
                    dark:from-gray-800/95 dark:to-gray-900/95 
                    border border-gray-200/50 dark:border-gray-700/50 
                    shadow-xl rounded-xl px-5 py-2.5 
                    font-semibold text-sm tracking-wide 
                    backdrop-blur-md 
                    text-indigo-600 dark:text-indigo-400
                  "
                >
                  <p className="drop-shadow-sm">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;