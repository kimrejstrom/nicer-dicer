import React from 'react';

interface IButton {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<IButton> = ({ title, onClick, ...buttonProps }) => (
  <button onClick={e => onClick(e)} {...buttonProps}>
    {title}
  </button>
);

export default Button;
