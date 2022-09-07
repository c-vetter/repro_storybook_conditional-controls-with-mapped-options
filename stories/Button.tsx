import React from 'react';
import './button.css';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  children: React.ReactChild;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  size = 'medium',
  children,
}: ButtonProps) => {
  const mode = 'storybook-button--primary'

  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
    >
      {children}
    </button>
  );
};
