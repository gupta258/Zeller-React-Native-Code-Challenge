import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { useFormContext, Controller, FieldError, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { COLORS } from '../constants';

interface FormTextInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: Path<T>;
  rules?: RegisterOptions<T>;
  error?: FieldError;
  showCharCount?: boolean;
  maxLength?: number;
  label?: string;
  showError?: boolean; // Control whether to show error message inside component
}

export const FormTextInput = <T extends FieldValues>({
  name,
  rules,
  error,
  showCharCount = false,
  maxLength,
  label,
  showError = true, // Default to true for backward compatibility
  ...textInputProps
}: FormTextInputProps<T>) => {
  const { control } = useFormContext<T>();
  
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => {
        const displayError = error || fieldError;
        return (
          <View>
            {label && (
              <Text className="text-sm font-semibold text-gray-400 mb-2.5" style={{ fontSize: 14, letterSpacing: 0.2 }}>
                {label}
              </Text>
            )}
            <TextInput
              className={`h-14 border rounded-xl px-4 bg-white ${
                displayError ? 'border-error' : 'border-gray-100'
              }`}
              style={{
                fontSize: 16,
                color: COLORS.GRAY[400],
                borderWidth: displayError ? 1.5 : 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              {...textInputProps}
            />
            {showError && displayError && (
              <View className="mt-1.5">
                <Text className="text-xs text-error font-medium" style={{ fontSize: 12 }}>
                  {displayError.message}
                </Text>
              </View>
            )}
            {!displayError && showCharCount && value && typeof value === 'string' && value.length > 0 && maxLength && (
              <Text className="text-xs text-gray-200 mt-1.5 text-right" style={{ fontSize: 12 }}>
                {value.length}/{maxLength}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

