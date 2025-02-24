import React from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ALERT_STYLES = {
  success: {
    container: 'bg-green-100 dark:bg-green-900/20 border-green-500',
    text: 'text-green-800 dark:text-green-200'
  },
  error: {
    container: 'bg-red-100 dark:bg-red-900/20 border-red-500',
    text: 'text-red-800 dark:text-red-200'
  }
};

const ContactAlert = ({ show, type = 'error', message, onClose }) => {
  if (!show) return null;

  const styles = ALERT_STYLES[type];

  return (
    <Alert className={`mb-4 ${styles.container}`}>
      <AlertDescription className="flex justify-between items-center">
        <span className={styles.text}>{message}</span>
        <button 
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      </AlertDescription>
    </Alert>
  );
};

export default ContactAlert;