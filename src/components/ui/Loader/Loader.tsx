import React from 'react';
import styles from './Loader.module.scss';
import clsx from 'clsx';
import { UISizes } from '@/types';

interface LoaderProps {
  size?: UISizes;
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
