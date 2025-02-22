import React, { forwardRef } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';

const FormField = forwardRef(({
  type = "text",
  icon: Icon,
  error,
  disabled,
  className = "",
  ...props
}, ref) => {
  const { theme } = useTheme();

  const getInputStyle = (hasError) => {
    const baseStyle = `w-full pl-10 pr-4 py-3 rounded-xl text-sm shadow-sm
      ${theme === "dark" ? "bg-slate-900/50" : "bg-slate-50"}
      border ${theme === "dark" ? "border-slate-700" : "border-slate-200"}
      focus:outline-none focus:ring-2 transition-colors duration-300 ease-in-out`;

    if (hasError) {
      return `${baseStyle} border-red-500 focus:ring-red-500`;
    }
    if (props.value && !hasError) {
      return `${baseStyle} border-green-500 focus:ring-green-500`;
    }
    return `${baseStyle} focus:ring-blue-500`;
  };

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className="mb-4 md:mb-6">
      <div className="relative">
        <Icon className={`absolute left-3 ${type === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"} w-5 h-5
          ${theme === "dark" ? "text-slate-400" : "text-slate-500"} transition-transform duration-300 ease-in-out`}
        />
        <InputComponent
          ref={ref}
          type={type === "textarea" ? undefined : type}
          className={`${getInputStyle(error)} ${type === "textarea" ? "resize-none" : ""} ${className}`}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs md:text-sm text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
});

// Add display name for better debugging
FormField.displayName = 'FormField';

export default FormField;
