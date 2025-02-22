import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { navItems } from './navItems';

const Navbar = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <nav className={`
        fixed bottom-0 md:bottom-4 left-1/2 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2
        w-full max-w-md
        bg-transparent backdrop-blur-xl rounded-t-2xl
        border border-gray-200/50 dark:border-gray-700/50
        z-40 flex flex-row justify-between items-center
        transition-all duration-500
        shadow-lg dark:shadow-gray-950/50
        p-2 md:p-4
      `}>
        <div className={`
          flex  justify-between w-full
        `}>
          <Link
            to="/"
            className={`
              text-center group relative
              hover:scale-110 transition-all duration-300
            `}
          >
            <div className={`
              w-12 h-12 bg-gradient-to-r from-zinc-600 to-slate-700 dark:from-zinc-300 dark:to-slate-400
              rounded-xl flex items-center justify-center shadow-lg border border-gray-200/50
              group-hover:shadow-2xl group-hover:shadow-zinc-500/25 dark:group-hover:shadow-zinc-400/25
              transition-all duration-300 relative overflow-hidden
            `}>
              <span className={`
                text-xl font-bold text-white dark:text-zinc-800
                group-hover:scale-110 transition-all duration-300
                relative z-10
              `}>
                KD
              </span>
            </div>
          </Link>

          <div className={`
            flex space-x-2 md:space-x-4
          `}>
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={`
                      group flex items-center justify-center
                      p-2 rounded-xl transition-all duration-300
                      hover:scale-110 overflow-hidden
                    `}
                  >
                    {({ isActive }) => (
                      <div className={`
                        relative w-8 h-8 flex items-center justify-center
                      `}>
                        <item.icon
                          className={`
                            w-5 h-5 group-hover:scale-110
                            ${isActive
                              ? 'text-zinc-600 dark:text-zinc-400'
                              : 'text-gray-600 dark:text-gray-300'
                            }
                          `}
                        />
                      </div>
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent
                  side={"top"}
                  className={`
                    bg-gradient-to-br from-white/95 to-gray-50/95
                    dark:from-gray-800/95 dark:to-gray-900/95
                    border border-gray-200/50 dark:border-gray-700/50
                    shadow-xl rounded-xl px-4 py-2
                    font-semibold tracking-wide
                    backdrop-blur-md
                    text-zinc-600 dark:text-zinc-400
                    text-sm
                  `}
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
