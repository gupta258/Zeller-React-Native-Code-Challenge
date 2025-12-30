import React from 'react';
import { View, Text } from 'react-native';
import { UserRole } from '../types';
import { COLORS } from '../constants';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = React.memo(({
  label,
  variant = 'primary',
  size = 'sm',
  className = '',
}) => {
  const backgroundColor = variant === 'primary' 
    ? COLORS.PRIMARY 
    : variant === 'secondary' 
    ? COLORS.SECONDARY 
    : COLORS.ERROR;

  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5';
  const fontSize = size === 'sm' ? 11 : 12;

  return (
    <View
      className={`rounded-xl self-start ${padding} ${className}`}
      style={{ backgroundColor }}
    >
      <Text
        className="text-white font-semibold"
        style={{
          fontSize,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
    </View>
  );
});

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md';
}

export const RoleBadge: React.FC<RoleBadgeProps> = React.memo(({ role, size = 'sm' }) => {
  if (role === 'All') return null;
  
  return (
    <Badge
      label={role}
      variant={role === 'Admin' ? 'primary' : 'secondary'}
      size={size}
    />
  );
});

