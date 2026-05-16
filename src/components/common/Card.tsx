import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <div className={`${styles.card} ${hoverEffect ? styles.hoverEffect : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};
