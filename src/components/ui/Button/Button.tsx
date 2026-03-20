import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: 'sm' | 'md';
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading, className, size = 'md', ...props }) => {
  const defaultClassName = `${styles.button} ${styles[size]}`;
  const combinedClassName = className ? `${defaultClassName} ${className}` : defaultClassName;

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
