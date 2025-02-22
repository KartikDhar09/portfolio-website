import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import emailjs from '@emailjs/browser';
import ContactForm from './ContactForm.jsx';
import ContactAlert from './ContactAlert.jsx';
import { Mail } from 'lucide-react';

export const Contact = () => {
  const { theme } = useTheme();
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        message: data.message.trim(),
      };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      setAlert({
        show: true,
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });

      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to send message. Please check your connection and try again.'
      });

      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`
        ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}
        min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-80px)]
        bg-transparent
        transition-all
        duration-500
        flex
        flex-col
        items-center
        py-4
          pb-20 // Add padding to the bottom to account for the navbar height
      `}
    >
      <div className="container mx-auto px-4 flex flex-col h-full w-full max-w-7xl">
        <div className={`
          rounded-xl sm:rounded-3xl
          bg-transparent backdrop-blur-0
          p-2 md:p-4 lg:p-6
          flex
          flex-col
          h-full
          w-full
        `}>
          {/* Header Section */}
          <div className="text-center mb-8 flex items-center justify-center space-x-2">
            <h2 className={`
              text-3xl md:text-4xl lg:text-5xl
              p-2
              font-black
              bg-clip-text
              text-transparent
              bg-gradient-to-r
              from-slate-600
              via-slate-700
              to-zinc-800
              dark:from-slate-300
              dark:via-zinc-300
              dark:to-slate-400
            `}>
              Get in Touch
            </h2>
            <Mail
              className={`
                w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10
                ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}
              `}
              strokeWidth={1.5}
            />
          </div>
          <div className="p-1 sm:p-2 rounded-lg sm:rounded-2xl backdrop-blur-lg border border-transparent mb-8">
            <p className={`
              text-sm md:text-base lg:text-lg
              leading-relaxed
              tracking-wide
              text-center
              font-medium
            `}>
              Have a question? I'd love to hear from you.
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-lg p-8 mx-auto overflow-y-auto">
            <ContactAlert
              {...alert}
              onClose={() => setAlert({ show: false, type: '', message: '' })}
            />
            <ContactForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
