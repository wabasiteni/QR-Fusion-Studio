
import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  wrapperClassName?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, options, error, className = '', wrapperClassName = '', ...props }) => {
  const baseStyles =
    'block w-full pl-3 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed';

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <select id={id} className={`${baseStyles} ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Select;
