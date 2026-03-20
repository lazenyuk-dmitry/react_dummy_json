import React from 'react';
import styles from './Loader.module.scss';
import clsx from 'clsx';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={clsx(
        styles.loader,
        styles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
