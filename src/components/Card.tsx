import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

/**
 * Reusable Card component for consistent container styling
 */
export const Card: React.FC<CardProps> = React.memo(({
  children,
  className = '',
  elevated = true,
  style,
  ...viewProps
}) => {
  return (
    <View
      className={`bg-white rounded-xl ${className}`}
      style={[
        elevated && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
});

