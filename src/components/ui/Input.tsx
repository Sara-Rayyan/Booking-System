import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '1rem', width: '100%' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem' }}>
          {label}
        </label>
      )}
      <input className={`input-modern ${className}`} {...props} />
    </div>
  );
}
