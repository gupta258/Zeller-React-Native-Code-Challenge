import React from 'react';
import { View, Text } from 'react-native';

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  helperText?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  helperText,
  className = '',
}) => {
  return (
    <View className={`mb-7 ${className}`}>
      {label && (
        <View className="flex-row items-center mb-2.5">
          <Text className="text-sm font-semibold text-gray-400" style={{ fontSize: 14, letterSpacing: 0.2 }}>
            {label}
          </Text>
          {required && (
            <Text className="text-error ml-1" style={{ fontSize: 14, fontWeight: '600' }}>
              *
            </Text>
          )}
        </View>
      )}
      {children}
      {error && (
        <View className="mt-1.5">
          <Text className="text-xs text-error font-medium" style={{ fontSize: 12 }}>
            {error}
          </Text>
        </View>
      )}
      {!error && helperText && (
        <View className="mt-1.5">
          <Text className="text-xs text-gray-200" style={{ fontSize: 12 }}>
            {helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

