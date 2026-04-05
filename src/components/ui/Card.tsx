import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', onClick, style }: CardProps) {
  return (
    <div 
      className={`glass-panel ${className}`} 
      onClick={onClick}
      style={{
        padding: '1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'var(--transition)',
        ...style
      }}
    >
      {children}
    </div>
  );
}
