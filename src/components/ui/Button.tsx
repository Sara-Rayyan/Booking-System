import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyle = 'btn';
  const variantStyle = variant === 'primary' ? 'btn-primary' : '';
  const finalClass = `${baseStyle} ${variantStyle} ${className}`.trim();

  return (
    <button className={finalClass} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? 'Wait...' : children}
    </button>
  );
}
