import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ZellerCustomer } from '../types';
import { deleteCustomer, insertCustomer, updateCustomer } from '../services/database';
import { useUsers } from '../context/UserContext';
import { useToast } from './useToast';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatActionErrorMessage, ERROR_MESSAGES } from '../utils/errorHelpers';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useUserActions = () => {
  const navigation = useNavigation<NavigationProp>();
  const { refreshUsers } = useUsers();
  const { showSuccess, showError } = useToast();

  const handleDelete = useCallback(
    async (user: ZellerCustomer, onConfirm?: () => void) => {
      try {
        await deleteCustomer(user.id);
        await refreshUsers();
        showSuccess({
          text1: 'User Deleted',
          text2: `${user.name} has been deleted successfully`,
        });
        onConfirm?.();
      } catch (error) {
        showError({
          text1: 'Error',
          text2: ERROR_MESSAGES.DELETE_USER,
        });
      }
    },
    [refreshUsers, showSuccess, showError]
  );

  const handleSave = useCallback(
    async (customer: ZellerCustomer, isEditMode: boolean) => {
      try {
        if (isEditMode) {
          await updateCustomer(customer);
        } else {
          await insertCustomer(customer);
        }
        await refreshUsers();
        showSuccess({
          text1: isEditMode ? 'User Updated' : 'User Added',
          text2: `${customer.name} has been ${isEditMode ? 'updated' : 'added'} successfully`,
        });
        return true;
      } catch (error) {
        const action = isEditMode ? 'update' : 'save';
        showError({
          text1: 'Error',
          text2: formatActionErrorMessage(action, error),
        });
        return false;
      }
    },
    [refreshUsers, showSuccess, showError]
  );

  const navigateToEdit = useCallback(
    (user: ZellerCustomer) => {
      navigation.navigate('UserForm', { user });
    },
    [navigation]
  );

  const navigateToAdd = useCallback(() => {
    navigation.navigate('UserForm');
  }, [navigation]);

  return {
    handleDelete,
    handleSave,
    navigateToEdit,
    navigateToAdd,
  };
};

