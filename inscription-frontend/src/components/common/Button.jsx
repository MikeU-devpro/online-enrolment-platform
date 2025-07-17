import React from 'react';

const Button = ({ children, primary, outline, size = 'md', className = '', ...props }) => {

  const baseStyles = 'rounded-md font-semibold shadow-md transition duration-300 ease-in-out cursor-pointer';

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-4 py-1 text-sm';
      break;
    case 'lg':
      sizeStyles = 'px-8 py-3 text-lg';
      break;
    case 'md':
    default:
      sizeStyles = 'px-6 py-2 text-base';
      break;
  }

  let typeStyles = '';
  let hoverStyles = '';

  if (primary) {
    typeStyles = 'bg-[#2A3B7C] text-white';
    hoverStyles = 'hover:bg-white hover:text-[#2A3B7C] hover:border hover:border-[#2A3B7C] active:bg-blue-100 active:shadow-lg';
  } else if (outline) {
    typeStyles = 'border border-[#2A3B7C] text-[#2A3B7C] bg-white';
    hoverStyles = 'hover:bg-[#2A3B7C] hover:text-white active:bg-blue-800 active:shadow-lg';
  } else {
    // Default styles if neither primary nor outline is specified
    typeStyles = 'bg-[#2A3B7C] text-white';
    hoverStyles = 'hover:bg-white hover:text-[#2A3B7C] hover:border hover:border-[#2A3B7C] active:bg-blue-100 active:shadow-lg';
  }

  const finalStyles = `${baseStyles} ${sizeStyles} ${typeStyles} ${hoverStyles} ${className}`;

  return (
    <button className={finalStyles.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;