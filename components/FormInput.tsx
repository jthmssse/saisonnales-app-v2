import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, placeholder, type = "text", isRequired = false, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input 
            type={type} 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

export default FormInput;