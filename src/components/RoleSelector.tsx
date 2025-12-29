import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFormContext, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS } from '../constants';

type Role = 'Admin' | 'Manager';

interface RoleSelectorProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
}

export const RoleSelector = <T extends FieldValues>({
  name,
  label,
}: RoleSelectorProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <View>
      {label && (
        <Text className="text-sm font-semibold text-gray-400 mb-2.5" style={{ fontSize: 14, letterSpacing: 0.2 }}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 h-14 border rounded-xl justify-center items-center ${
                value === 'Admin'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-100'
              }`}
              style={{
                borderWidth: value === 'Admin' ? 2 : 1,
                shadowColor: value === 'Admin' ? COLORS.PRIMARY : '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: value === 'Admin' ? 0.2 : 0.05,
                shadowRadius: value === 'Admin' ? 4 : 2,
                elevation: value === 'Admin' ? 3 : 1,
              }}
              onPress={() => onChange('Admin' as T[Path<T>])}
            >
              <Text
                className={`text-base ${
                  value === 'Admin' ? 'text-white' : 'text-gray-300'
                }`}
                style={{ 
                  fontSize: 16,
                  fontWeight: value === 'Admin' ? '600' : '500',
                  letterSpacing: 0.2,
                }}
              >
                Admin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 h-14 border rounded-xl justify-center items-center ml-3 ${
                value === 'Manager'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-100'
              }`}
              style={{
                borderWidth: value === 'Manager' ? 2 : 1,
                shadowColor: value === 'Manager' ? COLORS.PRIMARY : '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: value === 'Manager' ? 0.2 : 0.05,
                shadowRadius: value === 'Manager' ? 4 : 2,
                elevation: value === 'Manager' ? 3 : 1,
              }}
              onPress={() => onChange('Manager' as T[Path<T>])}
            >
              <Text
                className={`text-base ${
                  value === 'Manager' ? 'text-white' : 'text-gray-300'
                }`}
                style={{ 
                  fontSize: 16,
                  fontWeight: value === 'Manager' ? '600' : '500',
                  letterSpacing: 0.2,
                }}
              >
                Manager
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

