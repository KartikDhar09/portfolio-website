// ContactForm.jsx
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MessageSquare, User } from 'lucide-react';
import FormField from './FormField.jsx';

const VALIDATION_RULES = {
  name: {
    required: "Name is required",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    maxLength: { value: 50, message: "Name must be less than 50 characters" },
    pattern: { 
      value: /^[a-zA-Z\s]*$/, 
      message: "Name can only contain letters and spaces" 
    }
  },
  email: {
    required: "Email is required",
    pattern: { 
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: "Please enter a valid email address" 
    }
  },
  message: {
    required: "Message is required",
    minLength: { value: 10, message: "Message must be at least 10 characters" },
    maxLength: { value: 1000, message: "Message must be less than 1000 characters" }
  }
};

const FORM_FIELDS = [
  {
    name: "name",
    icon: User,
    placeholder: "Your name",
    rules: VALIDATION_RULES.name
  },
  {
    name: "email",
    type: "email",
    icon: Mail,
    placeholder: "your.email@example.com",
    rules: VALIDATION_RULES.email
  },
  {
    name: "message",
    type: "textarea",
    icon: MessageSquare,
    placeholder: "Your message...",
    rows: "4",
    rules: VALIDATION_RULES.message
  }
];

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

  const messageLength = watch('message')?.length || 0;

  const buttonClass = useMemo(() => {
    const baseClass = "max-w-40 py-2 px-4 rounded-md bg-blue-600 text-white font-medium text-sm " +
      "flex items-center justify-center gap-2 mx-auto transition-opacity disabled:opacity-70";
    
    return `${baseClass} ${(!isDirty || !isValid) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`;
  }, [isDirty, isValid]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {FORM_FIELDS.map(({ name, icon, rules, ...fieldProps }) => (
        <div key={name}>
          <FormField
            icon={icon}
            error={errors[name]?.message}
            disabled={isSubmitting}
            {...fieldProps}
            {...register(name, rules)}
            className="form-field"
          />
          {name === "message" && (
            <p className="mt-1 text-xs text-slate-500">
              {messageLength}/1000 characters
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting || !isDirty || !isValid}
        className={buttonClass}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white text-center border-t-transparent rounded-full animate-spin" />
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
};

export default ContactForm;