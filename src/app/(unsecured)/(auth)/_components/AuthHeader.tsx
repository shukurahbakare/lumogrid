import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
}) => (
  <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
    <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>
    {subtitle && <p style={{ color: '#666', marginTop: 8 }}>{subtitle}</p>}
  </header>
);

export default AuthHeader;