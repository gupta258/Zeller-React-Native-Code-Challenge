import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { ZellerCustomer } from '../types';
import { Avatar } from './Avatar';
import { RoleBadge } from './Badge';
import { IconButton } from './IconButton';

interface UserItemProps {
  user: ZellerCustomer;
  onPress?: () => void;
  onDelete?: () => void;
  index?: number;
  isDeleting?: boolean;
}

export const UserItem: React.FC<UserItemProps> = React.memo(({ user, onPress, onDelete, index = 0, isDeleting = false }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isDeleting) {
      // Initial entrance animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          delay: index * 50,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          delay: index * 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, translateY, index, isDeleting]);

  useEffect(() => {
    if (isDeleting) {
      // Delete animation: fade out, slide right, and scale down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isDeleting, fadeAnim, translateX, scaleAnim]);

  return (
    <Animated.View
      className="flex-row bg-white mx-4 my-1.5 rounded-xl items-center shadow-sm"
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY },
          { translateX },
          { scale: scaleAnim },
        ],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <TouchableOpacity 
        className="flex-1 flex-row p-4 items-center" 
        onPress={onPress} 
        activeOpacity={0.6}
        disabled={!onPress}
      >
        <View className="mr-3.5">
          <Avatar name={user.name} role={user.role} size={56} />
        </View>
        <View className="flex-1 min-w-0">
          <View className="flex-row items-center mb-1.5 flex-wrap">
            <Text 
              className="text-base font-semibold text-gray-400 mr-2 flex-shrink" 
              numberOfLines={1}
              style={{ fontSize: 17 }}
            >
              {user.name}
            </Text>
            <RoleBadge role={user.role} />
          </View>
          {user.email && (
            <Text className="text-sm text-gray-300 mt-0.5" numberOfLines={1} style={{ fontSize: 13 }}>
              {user.email}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {onDelete && (
        <IconButton
          iconName="close-outline"
          size={24}
          variant="danger"
          onPress={onDelete}
          className="mr-2"
        />
      )}
    </Animated.View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.user.role === nextProps.user.role &&
    prevProps.isDeleting === nextProps.isDeleting &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.onDelete === nextProps.onDelete
  );
});

