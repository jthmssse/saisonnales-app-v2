import React from 'react';

interface FormTextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  isRequired?: boolean;
  error?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, value, onChange, placeholder, rows = 3, isRequired = false, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <textarea 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            rows={rows} 
            className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`} 
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

export default FormTextArea;