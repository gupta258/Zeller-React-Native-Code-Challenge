import React, { memo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(({
  message = 'Loading...',
  size = 'large',
  color = '#6C5CE7',
  className = '',
}) => {
  return (
    <View className={`flex-1 justify-center items-center bg-gray-50 ${className}`}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="mt-4 text-base font-medium text-gray-300" style={{ fontSize: 16 }}>
          {message}
        </Text>
      )}
    </View>
  );
});

