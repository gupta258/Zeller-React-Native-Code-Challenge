import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

interface IconButtonProps extends Omit<TouchableOpacityProps, 'className'> {
  iconName: string;
  size?: number;
  color?: string;
  variant?: 'default' | 'danger' | 'ghost';
  className?: string;
}

/**
 * Reusable IconButton component for icon-only buttons
 */
export const IconButton: React.FC<IconButtonProps> = React.memo(({
  iconName,
  size = 24,
  color,
  variant = 'default',
  className = '',
  ...touchableProps
}) => {
  const getIconColor = () => {
    if (color) return color;
    if (variant === 'danger') return COLORS.ERROR;
    if (variant === 'ghost') return COLORS.PRIMARY;
    return COLORS.GRAY[400];
  };

  const getBackgroundColor = () => {
    if (variant === 'danger') return '#FEE';
    if (variant === 'ghost') return 'transparent';
    return COLORS.GRAY[50];
  };

  return (
    <TouchableOpacity
      className={`rounded-full justify-center items-center ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        width: size + 16,
        height: size + 16,
      }}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...touchableProps}
    >
      <Icon name={iconName} size={size} color={getIconColor()} />
    </TouchableOpacity>
  );
});

