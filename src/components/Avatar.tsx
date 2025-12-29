import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { UserRole } from '../types';
import { COLORS } from '../constants';
import { getInitials } from '../utils/helpers';

interface AvatarProps {
  name: string;
  role?: UserRole;
  size?: number;
  className?: string;
}

/**
 * Reusable Avatar component that displays user initials in a colored circle
 */
export const Avatar: React.FC<AvatarProps> = React.memo(({ 
  name, 
  role = 'Admin', 
  size = 56,
  className = '',
}) => {
  const initials = useMemo(() => getInitials(name, 2), [name]);

  const isAdmin = role === 'Admin';
  const backgroundColor = isAdmin ? COLORS.PRIMARY : COLORS.SECONDARY;

  return (
    <View
      className={`rounded-full justify-center items-center ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      <Text
        className="text-white font-bold"
        style={{
          fontSize: size * 0.32,
          letterSpacing: 0.5,
        }}
      >
        {initials}
      </Text>
    </View>
  );
});

