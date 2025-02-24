import React, { useState, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { navItems } from './navItems.js';

const NavItem = ({ item, isExpanded, onClick }) => {
  const baseIconClasses = "w-4 h-4 transition-all duration-300 group-hover:scale-110";
  const baseLinkClasses = "group transition-all duration-300 hover:scale-105 whitespace-nowrap";
  
  const getMobileClasses = (isActive) => `
    flex flex-col items-center p-2 rounded-lg ${baseLinkClasses}
    ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}
  `;
  
  const getDesktopClasses = (isActive) => `
    flex flex-row items-center space-x-2 p-1.5 rounded-lg ${baseLinkClasses}
    ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}
  `;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) => 
        isExpanded ? getMobileClasses(isActive) : getDesktopClasses(isActive)
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative w-6 h-6 flex items-center justify-center">
            <item.icon
              className={`${baseIconClasses} ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 scale-110'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            />
          </div>
          <span
            className={`
              ${isExpanded ? 'text-xs' : 'text-sm'} 
              font-medium transition-colors duration-300
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300'
              }
            `}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const navClasses = useMemo(() => `
    fixed transition-all duration-300 ease-in-out z-40
    md:bottom-2 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl md:rounded-xl
    ${isExpanded
      ? 'bottom-0 left-1/2 -translate-x-1/2 w-full rounded-t-xl'
      : 'bottom-4 right-4 w-auto rounded-full'
    }
    backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50
    shadow-lg dark:shadow-gray-950/50
  `, [isExpanded]);

  const memoizedNavItems = useMemo(() => navItems.map(item => (
    <NavItem
      key={item.path}
      item={item}
      isExpanded={isExpanded}
      onClick={handleCollapse}
    />
  )), [isExpanded, handleCollapse]);

  return (
    <>
      <nav className={navClasses}>
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center w-full px-3 py-2">
          <div className="flex space-x-6 lg:space-x-8 flex-wrap justify-center">
            {memoizedNavItems}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {isExpanded ? (
            <div className="flex justify-center w-full px-3 py-0">
              <div className="flex space-x-4 flex-wrap justify-center">
                {memoizedNavItems}
              </div>
            </div>
          ) : (
            <button
              onClick={handleExpand}
              className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden"
          onClick={handleCollapse}
        />
      )}
    </>
  );
};

export default Navbar;