import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  isRequired?: boolean;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, children, isRequired = false, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <select 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}>
            {children}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

export default FormSelect;