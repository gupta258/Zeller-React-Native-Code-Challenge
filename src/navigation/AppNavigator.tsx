import React from 'react';
import { Platform, Easing } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import UserListScreen from '../screens/UserListScreen';
import UserFormScreen from '../screens/UserFormScreen';
import { Button } from '../components/Button';
import { useUserActions } from '../hooks/useUserActions';
import { ZellerCustomer } from '../types';

export type RootStackParamList = {
  UserList: undefined;
  UserForm: { user?: ZellerCustomer } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Custom transition configuration for smoother Android animations
const transitionConfig = {
  animation: 'timing' as const,
  config: {
    duration: 300,
    easing: Platform.select({
      ios: Easing.out(Easing.cubic),
      android: Easing.bezier(0.4, 0.0, 0.2, 1), // Material Design easing curve
    }),
  },
};

export const AppNavigator: React.FC = () => {
  const { navigateToAdd } = useUserActions();

  return (
    <Stack.Navigator
      initialRouteName="UserList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
        },
        headerTintColor: '#2D3436',
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: '600',
          letterSpacing: 0.2,
          color: '#2D3436',
        },
        headerBackTitleStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        headerShadowVisible: false,
        // Smooth transitions for Android - using horizontal slide for iOS-like feel
        cardStyleInterpolator: Platform.select({
          ios: CardStyleInterpolators.forHorizontalIOS,
          android: CardStyleInterpolators.forHorizontalIOS, // Use iOS-style horizontal slide for smoother Android transitions
        }),
        transitionSpec: {
          open: transitionConfig,
          close: transitionConfig,
        },
        // Enable gesture-based navigation
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // Animation timing
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={{
          title: 'Customers',
          headerRight: () => (
            <Button
              title="+ Add"
              variant="ghost"
              size="sm"
              onPress={navigateToAdd}
              className="px-4 py-2"
            />
          ),
        }}
      />
      <Stack.Screen
        name="UserForm"
        component={UserFormScreen}
        options={{
          title: 'Add User',
        }}
      />
    </Stack.Navigator>
  );
};

