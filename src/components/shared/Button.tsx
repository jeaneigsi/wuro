import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = false,
  fullWidth = false,
}) => {
  // Styles de base
  const baseStyles = 'rounded-lg transition-all flex items-center justify-center gap-2';
  
  // Styles de variante
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'border border-gray-300 hover:border-gray-400 text-gray-700',
    outline: 'border border-white hover:bg-blue-700 text-white',
  };
  
  // Styles de taille
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm font-medium',
    lg: 'px-8 py-4 text-base font-medium',
  };
  
  // Styles de largeur
  const widthStyles = fullWidth ? 'w-full' : 'w-auto';
  
  // Combinaison des styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  // Si un lien est fourni, utiliser Link
  if (to) {
    return (
      <Link to={to} className={buttonStyles} onClick={onClick}>
        {children}
        {icon && <FaArrowRight className="text-sm" />}
      </Link>
    );
  }
  
  // Sinon, utiliser un bouton standard
  return (
    <button className={buttonStyles} onClick={onClick}>
      {children}
      {icon && <FaArrowRight className="text-sm" />}
    </button>
  );
};

export default Button; 