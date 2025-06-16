import React from 'react';

interface CustomTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  disabled?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={`mb-1 text-sm font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-800 dark:text-white'
          }`}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        disabled={disabled}
        className={`rounded-md border px-3 py-2 text-sm outline-none transition-all
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${disabled ? 'bg-gray-200 text-gray-700' : 'bg-white dark:bg-gray-800'}
          ${!disabled ? 'hover:border-gray-400' : ''}
          focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-700`}
      />
      {error && (
        <span className="mt-1 text-sm text-red-500">
          Please check your input.
        </span>
      )}
    </div>
  );
};

export default CustomTextField;
