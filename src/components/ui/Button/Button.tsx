import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { UISizes } from '@/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: UISizes;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading, className, size = 'md', ...props }) => {
  const defaultClassName = clsx(styles.button, styles[size]);
  const combinedClassName = className ? clsx(defaultClassName, className) : defaultClassName;

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
