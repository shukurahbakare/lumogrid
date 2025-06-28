"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';

type CustomButtonProps = {
  text: string;
  onClick?: () => void;
  mode?: 'primary' | 'secondary';
  link?: string;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  mode = 'primary',
  link,
  icon,
  iconPosition = 'right',
}) => {
  const router = useRouter();
  const baseStyle =
    'px-4 py-2.5 rounded-lg font-semibold focus:outline-none transition-colors flex items-center justify-center gap-2';
  const primaryStyle = 'bg-[#34CF94] text-white hover:bg-green-700';
  const secondaryStyle = 'bg-gray-900 text-gray-50 hover:bg-gray-300';

  const className =
    baseStyle + ' ' + (mode === 'primary' ? primaryStyle : secondaryStyle);

  const handleClick = () => {
    if (onClick) onClick();
    if (link) router.push(link);
  };

  return (
    <button className={className} onClick={handleClick}>
      {icon && iconPosition === 'left' && React.createElement(icon, { size: 20 })}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <span>{React.createElement(icon, { size: 20 })}</span>}
    </button>
  );
};

export default CustomButton;