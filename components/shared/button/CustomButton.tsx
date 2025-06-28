import React from 'react';

type CustomButtonProps = {
  text: string;
  onClick?: () => void;
  mode?: 'primary' | 'secondary';
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  mode = 'primary',
}) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors';
  const primaryStyle = 'bg-[#34CF94] text-white hover:bg-green-700';
  const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  const className =
    baseStyle + ' ' + (mode === 'primary' ? primaryStyle : secondaryStyle);

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;