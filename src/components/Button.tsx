import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'className'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: {
    bg: 'bg-primary',
    text: 'text-white',
    border: 'border-primary',
  },
  secondary: {
    bg: 'bg-secondary',
    text: 'text-white',
    border: 'border-secondary',
  },
  outline: {
    bg: 'bg-transparent',
    text: 'text-primary',
    border: 'border-primary border-2',
  },
  ghost: {
    bg: 'bg-transparent',
    text: 'text-primary',
    border: 'border-transparent',
  },
  danger: {
    bg: 'bg-error',
    text: 'text-white',
    border: 'border-error',
  },
};

const sizeStyles: Record<ButtonSize, { height: string; padding: string; text: string }> = {
  sm: {
    height: 'h-10',
    padding: 'px-3 py-2',
    text: 'text-sm',
  },
  md: {
    height: 'h-12',
    padding: 'px-4 py-3',
    text: 'text-base',
  },
  lg: {
    height: 'h-14',
    padding: 'px-6 py-4',
    text: 'text-lg',
  },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...touchableProps
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`
        ${sizeStyle.height}
        ${variantStyle.bg}
        ${variantStyle.border}
        ${sizeStyle.padding}
        rounded-xl
        justify-center
        items-center
        flex-row
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50' : ''}
        ${className}
      `}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={{
        shadowColor: variant === 'primary' || variant === 'secondary' ? COLORS.PRIMARY : '#000',
        shadowOffset: { width: 0, height: variant === 'outline' || variant === 'ghost' ? 0 : 2 },
        shadowOpacity: variant === 'outline' || variant === 'ghost' ? 0 : 0.2,
        shadowRadius: variant === 'outline' || variant === 'ghost' ? 0 : 4,
        elevation: variant === 'outline' || variant === 'ghost' ? 0 : 3,
      }}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : COLORS.PRIMARY} />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text
            className={`${variantStyle.text} ${sizeStyle.text} font-semibold`}
            style={{ 
              fontSize: size === 'sm' ? 15 : size === 'md' ? 16 : 18,
              fontWeight: '600',
              letterSpacing: 0.2,
            }}
          >
            {title}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

