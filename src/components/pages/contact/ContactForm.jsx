import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Send, MessageSquare, User } from 'lucide-react';
import FormField from './FormField.jsx';

const ContactForm = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const validateName = (value) => {
    if (!value) return "Name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]*$/.test(value)) return "Name can only contain letters and spaces";
    return true;
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Please enter a valid email address";
    }
    if (value.length > 100) return "Email must be less than 100 characters";
    return true;
  };

  const validateMessage = (value) => {
    if (!value) return "Message is required";
    if (value.length < 10) return "Message must be at least 10 characters";
    if (value.length > 1000) return "Message must be less than 1000 characters";
    return true;
  };

  const messageLength = watch('message')?.length || 0;

  const onSubmitWrapper = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-8">
      <FormField
        icon={User}
        error={errors.name?.message}
        disabled={isSubmitting}
        placeholder="Your name"
        {...register("name", { validate: validateName })}
        className="form-field"
      />

      <FormField
        type="email"
        icon={Mail}
        error={errors.email?.message}
        disabled={isSubmitting}
        placeholder="your.email@example.com"
        {...register("email", { validate: validateEmail })}
        className="form-field"
      />

      <div>
        <FormField
          type="textarea"
          icon={MessageSquare}
          error={errors.message?.message}
          disabled={isSubmitting}
          placeholder="Your message..."
          rows="4"
          {...register("message", { validate: validateMessage })}
          className="form-field"
        />
        <p className="mt-1 text-xs text-slate-500">
          {messageLength}/1000 characters
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isDirty || !isValid}
        className={`max-w-40 py-2 px-4 rounded-md
          bg-blue-600
          text-white font-medium text-sm
          flex items-center justify-center gap-2 mx-auto
          transition-opacity
          ${(!isDirty || !isValid) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
          disabled:opacity-70`}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
