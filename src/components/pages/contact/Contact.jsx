import React, { useState, useCallback, memo } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import emailjs from '@emailjs/browser';
import ContactForm from './ContactForm.jsx';
import ContactAlert from './ContactAlert.jsx';

const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY,
};

const ALERT_TIMEOUT = 3000;
const ALERT_MESSAGES = {
  SUCCESS: 'Thank you for your message! I will get back to you within 24 hours.',
  ERROR: 'Failed to send message. Please check your connection and try again.',
};

const ContactHeader = memo(() => (
  <>
    <h2 className="text-3xl md:text-4xl lg:text-5xl p-2 font-black bg-clip-text text-transparent bg-gradient-to-r 
      from-slate-600 via-slate-700 to-zinc-800 dark:from-slate-300 dark:via-zinc-300 dark:to-slate-400 text-center mb-8">
      Get in Touch
    </h2>
    
    <div className="p-1 sm:p-2 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent mb-8">
      <p className="text-sm md:text-base lg:text-lg leading-relaxed tracking-wide text-center font-medium">
        Have a question? I'd love to hear from you.
      </p>
    </div>
  </>
));

 export const Contact = () => {
  const { theme } = useTheme();
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearAlert = useCallback(() => {
    setAlert({ show: false, type: '', message: '' });
  }, []);

  const handleSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    try {
      const templateParams = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setAlert({
        show: true,
        type: 'success',
        message: ALERT_MESSAGES.SUCCESS
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({
        show: true,
        type: 'error',
        message: ALERT_MESSAGES.ERROR
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(clearAlert, ALERT_TIMEOUT);
    }
  }, [clearAlert]);

  const themeClasses = theme === 'dark' ? 'text-zinc-100' : 'text-slate-900';

  return (
    <div className={`
      ${themeClasses}
      min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)]
      bg-transparent
      transition-all
      duration-500
      flex
      flex-col
      items-center
      py-4
      pb-20
    `}>
      <div className="container mx-auto px-4 flex flex-col h-full w-full max-w-7xl">
        <div className="rounded-xl sm:rounded-3xl bg-transparent backdrop-blur-0 p-2 md:p-4 lg:p-6 flex flex-col h-full w-full">
          <ContactHeader />
          <div className="w-full max-w-lg p-8 mx-auto overflow-y-auto">
            <ContactAlert {...alert} onClose={clearAlert} />
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;