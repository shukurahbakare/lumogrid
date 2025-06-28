"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

type CustomButtonProps = {
  text: string;
  onClick?: () => void;
  mode?: 'primary' | 'secondary';
  link?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  mode = 'primary',
  link
}) => {
  const router = useRouter();
  const baseStyle =
    'px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors';
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
      {text}
    </button>
  );
};

export default CustomButton;