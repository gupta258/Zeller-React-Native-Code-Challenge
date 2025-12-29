import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { UserRole } from '../types';
import { TABS } from '../constants';

interface TabBarProps {
  activeTab: UserRole;
  onTabChange: (tab: UserRole) => void;
  page: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_PADDING = 16; // paddingHorizontal: 8 * 2
const TAB_MARGIN = 8; // marginHorizontal: 4 * 2
const TAB_COUNT = TABS.length;
const TAB_WIDTH = (SCREEN_WIDTH - TAB_PADDING) / TAB_COUNT;
const INDICATOR_WIDTH = TAB_WIDTH - TAB_MARGIN;

export const TabBar: React.FC<TabBarProps> = React.memo(({ activeTab, onTabChange, page }) => {
  const translateX = React.useRef(new Animated.Value(page * TAB_WIDTH)).current;

  const activeTabIndex = useMemo(() => TABS.indexOf(activeTab), [activeTab]);

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeTabIndex * TAB_WIDTH,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [activeTabIndex, translateX]);

  return (
    <View className="bg-white border-b border-gray-100">
      <View className="flex-row px-2">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            className="flex-1 py-4 items-center rounded-lg mx-1"
            onPress={() => onTabChange(tab)}
          >
            <Text 
              className={`text-sm font-medium ${activeTab === tab ? 'text-primary font-bold' : 'text-gray-300'}`}
              style={{ fontSize: 15, letterSpacing: 0.2 }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="h-0.5 relative mx-2">
        <Animated.View
          className="absolute h-0.5 bg-primary rounded-sm"
          style={{
            width: INDICATOR_WIDTH,
            transform: [{ translateX }],
            left: TAB_PADDING / 2,
          }}
        />
      </View>
    </View>
  );
});
