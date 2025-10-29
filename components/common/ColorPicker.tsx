
import React from 'react';

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, id, value, onChange, wrapperClassName = '', ...props }) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${wrapperClassName}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={onChange}
          className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-700"
          style={{backgroundColor: 'transparent'}} /* Required for some browsers to show color picker UI properly */
          {...props}
        />
        <span className="text-sm text-slate-400 tabular-nums">{String(value).toUpperCase()}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
