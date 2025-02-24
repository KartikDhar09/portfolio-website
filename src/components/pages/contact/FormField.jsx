import React, { forwardRef, useMemo } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';

const FormField = forwardRef(({
  type = "text",
  icon: Icon,
  error,
  disabled,
  className = "",
  value,
  ...props
}, ref) => {
  const { theme } = useTheme();
  
  const themeStyles = useMemo(() => ({
    background: theme === "dark" ? "bg-slate-900/50" : "bg-slate-50",
    border: theme === "dark" ? "border-slate-700" : "border-slate-200",
    iconColor: theme === "dark" ? "text-slate-400" : "text-slate-500"
  }), [theme]);

  const inputStyle = useMemo(() => {
    const baseStyle = `w-full pl-10 pr-4 py-3 rounded-xl text-sm shadow-sm
      ${themeStyles.background}
      border ${themeStyles.border}
      focus:outline-none focus:ring-2 transition-colors duration-300 ease-in-out`;

    if (error) return `${baseStyle} border-red-500 focus:ring-red-500`;
    if (value) return `${baseStyle} border-green-500 focus:ring-green-500`;
    return `${baseStyle} focus:ring-blue-500`;
  }, [error, value, themeStyles]);

  const isTextarea = type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";

  const iconStyles = useMemo(() => 
    `absolute left-3 ${isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"} w-5 h-5
    ${themeStyles.iconColor} transition-transform duration-300 ease-in-out`
  , [isTextarea, themeStyles.iconColor]);

  return (
    <div className="mb-4 md:mb-6">
      <div className="relative">
        <Icon className={iconStyles} />
        <InputComponent
          ref={ref}
          type={isTextarea ? undefined : type}
          className={`${inputStyle} ${isTextarea ? "resize-none" : ""} ${className}`}
          disabled={disabled}
          value={value}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs md:text-sm text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;