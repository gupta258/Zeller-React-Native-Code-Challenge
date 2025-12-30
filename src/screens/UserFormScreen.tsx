import React, { useEffect, useCallback, useMemo } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { generateUUID } from '../utils/uuid';
import { ZellerCustomer, UserFormData } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FormTextInput } from '../components/FormTextInput';
import { RoleSelector } from '../components/RoleSelector';
import { FormField } from '../components/FormField';
import { Button } from '../components/Button';
import { nameValidationRules, emailValidationRules } from '../utils/validationRules';
import { createNameValidationWithDuplicateCheck } from '../utils/validationHelpers';
import { useUserActions } from '../hooks/useUserActions';
import { useUsers } from '../context/UserContext';

type UserFormRouteProp = RouteProp<RootStackParamList, 'UserForm'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'UserForm'>;

const UserFormScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<UserFormRouteProp>();
  const { handleSave } = useUserActions();
  const { users } = useUsers();
  const user = route.params?.user;
  const isEditMode = !!user;

  const nameRules = useMemo(() => {
    const baseRules = nameValidationRules<UserFormData>();
    return createNameValidationWithDuplicateCheck<UserFormData, ZellerCustomer>(
      baseRules,
      users,
      user?.id
    );
  }, [users, user?.id]);

  const methods = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'Admin',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: UserFormData) => {
      const customer: ZellerCustomer = {
        id: user?.id || generateUUID(),
        name: data.name.trim(),
        email: data.email.trim() || undefined,
        role: data.role,
      };

      const success = await handleSave(customer, isEditMode);
      if (success) {
        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    },
    [user, isEditMode, handleSave, navigation]
  );

  useEffect(() => {
    navigation.setOptions({
      title: isEditMode ? 'Edit User' : 'Add User',
      headerRight: () => (
        <Button
          title="Save"
          variant="ghost"
          size="sm"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          className="px-4 py-2"
        />
      ),
    });
  }, [navigation, isEditMode, isSubmitting, handleSubmit, onSubmit]);

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ padding: 20, paddingTop: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <FormField label="Name" required error={errors.name?.message}>
            <FormTextInput
              name="name"
              rules={nameRules}
              placeholder="Enter name"
              placeholderTextColor="#95A5A6"
              maxLength={50}
              showCharCount
              autoFocus={!isEditMode}
              showError={false}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <FormTextInput
              name="email"
              rules={emailValidationRules<UserFormData>()}
              placeholder="Enter email (optional)"
              placeholderTextColor="#95A5A6"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              showError={false}
            />
          </FormField>

          <FormField label="Role" required>
            <RoleSelector name="role" />
          </FormField>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default UserFormScreen;

