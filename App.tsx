/**
 * Zeller React Native Code Challenge
 * User Management App with GraphQL API and Local Database
 *
 * @format
 */

import './global.css';
import React from 'react';
import { StatusBar, useColorScheme, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { UserProvider } from './src/context/UserContext';
import { AppNavigator } from './src/navigation/AppNavigator';

import { NAVIGATION_HEADER_HEIGHT } from './src/constants';

function ToastWrapper() {
  const insets = useSafeAreaInsets();
  // Calculate offset: status bar + navigation header
  const topOffset = insets.top + (Platform.OS === 'ios' ? NAVIGATION_HEADER_HEIGHT.IOS : NAVIGATION_HEADER_HEIGHT.ANDROID);
  
  return <Toast topOffset={topOffset} />;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <UserProvider>
          <NavigationContainer>
            <AppNavigator />
            <ToastWrapper />
          </NavigationContainer>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
