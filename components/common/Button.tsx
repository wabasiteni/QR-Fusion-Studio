
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 text-white',
    secondary:
      'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 text-slate-100',
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white',
    ghost: 'bg-transparent hover:bg-slate-700 focus:ring-slate-500 text-slate-300 hover:text-sky-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2 h-4 w-4">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 h-4 w-4">{rightIcon}</span>}
    </button>
  );
};

export default Button;
