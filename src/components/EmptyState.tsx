import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface EmptyStateProps {
  icon?: string;
  iconSize?: number;
  title: string;
  message?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = memo(({
  icon = 'people-outline',
  iconSize = 64,
  title,
  message,
  className = '',
}) => {
  return (
    <View className={`flex-1 justify-center items-center pt-24 px-8 ${className}`}>
      <Icon name={icon} size={iconSize} color="#95A5A6" className="mb-4 opacity-40" />
      <Text className="text-lg font-semibold text-gray-400 mb-2 text-center" style={{ fontSize: 18 }}>
        {title}
      </Text>
      {message && (
        <Text className="text-sm text-gray-200 mt-1.5 text-center" numberOfLines={2} style={{ fontSize: 14, lineHeight: 20 }}>
          {message}
        </Text>
      )}
    </View>
  );
});

