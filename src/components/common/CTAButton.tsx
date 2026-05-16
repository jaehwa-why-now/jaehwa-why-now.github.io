import React from 'react';
import styles from './CTAButton.module.css';

interface CTAButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

type CTAButtonProps =
  | (CTAButtonBaseProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | (CTAButtonBaseProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>);

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  className = '',
  ...props
}) => {
  const baseClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
