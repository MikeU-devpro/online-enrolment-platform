import React from 'react';

const Button = ({ children, primary, secondary, tertiary, size = 'md', className = '', ...props }) => {

  const baseStyles = 'w-[153px] h-[40px] px-[16.01px] py-[8px] rounded-md font-semibold transition duration-300 ease-in-out cursor-pointer flex items-center justify-center'; // Added flex, items-center, justify-center for text centering

  let sizeTextStyles = '';
  switch (size) {
    case 'sm':
      sizeTextStyles = 'text-sm';
      break;
    case 'lg':
      sizeTextStyles = 'text-lg';
      break;
    case 'md':
    default:
      sizeTextStyles = 'text-base';
      break;
  }

  let typeStyles = '';
  let hoverActiveStyles = '';

  if (primary) {

    typeStyles = 'bg-[#101957] text-white';
    hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:bg-[#585E89] active:shadow-[0_0_5.37px_0_#101957]';
  } else if (secondary) {

    typeStyles = 'bg-white text-[#101957] border border-[#101957]';
    hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:border-[#9FA3BC]';
  } else if (tertiary) {

    typeStyles = 'bg-[#10195726] text-[#101957] border border-[#101957]';
    hoverActiveStyles = 'hover:shadow-[0_3px_5px_0_#101957]';
  }
  else {

    typeStyles = 'bg-[#101957] text-white';
    hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:bg-[#585E89] active:shadow-[0_0_5.37px_0_#101957]';
  }

  const finalStyles = `${baseStyles} ${sizeTextStyles} ${typeStyles} ${hoverActiveStyles} ${className}`;

  return (
    <button className={finalStyles.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;