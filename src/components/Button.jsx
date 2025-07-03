import React from 'react';

function Button({
  children,
  type = 'button',
  textColor = 'text-neo-text dark:text-neo-dark-text',
  bgColor = 'bg-transparent',
  hoverColor = 'hover:bg-neo-accent/10 dark:hover:bg-neo-accent-dark/10',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-3 py-1 rounded-full text-sm font-heading font-medium
        transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]
        ${bgColor} ${textColor} ${hoverColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;