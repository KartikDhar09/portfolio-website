// components/contact/ContactAlert.jsx
import React from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
 
const ContactAlert = ({ show, type, message, onClose }) => {
  if (!show) return null;

  return (
    <Alert className={`mb-4 ${
      type === 'success' 
        ? 'bg-green-100 dark:bg-green-900/20 border-green-500' 
        : 'bg-red-100 dark:bg-red-900/20 border-red-500'
    }`}>
      <AlertDescription className="flex justify-between items-center">
        <span className={`${
          type === 'success' 
            ? 'text-green-800 dark:text-green-200' 
            : 'text-red-800 dark:text-red-200'
        }`}>
          {message}
        </span>
        <button 
          onClick={onClose}
          className="p-1 hover:opacity-70"
        >
          <X className="w-4 h-4" />
        </button>
      </AlertDescription>
    </Alert>
  );
};

export default ContactAlert;