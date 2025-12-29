import React, { memo } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = memo(({
  value,
  onChangeText,
  placeholder = 'Search by name...',
}) => {
  return (
    <View className="px-4 py-4 bg-white border-b border-gray-100">
      <View className="flex-row items-center bg-gray-50 rounded-xl px-3.5 h-11 border border-gray-100">
        <Icon name="search-outline" size={20} color={COLORS.GRAY[200]} className="mr-2.5" />
        <TextInput
          className="flex-1 text-sm text-gray-400 p-0"
          style={{ fontSize: 15 }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY[200]}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
});

