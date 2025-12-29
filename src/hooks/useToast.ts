import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { TOAST_DURATION } from '../constants';

interface ToastOptions {
  text1?: string;
  text2?: string;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
}

export const useToast = () => {
  const showSuccess = useCallback((options: ToastOptions) => {
    Toast.show({
      type: 'success',
      text1: options.text1 || 'Success',
      text2: options.text2,
      position: options.position || 'top',
      visibilityTime: options.visibilityTime || TOAST_DURATION.MEDIUM,
    });
  }, []);

  const showError = useCallback((options: ToastOptions) => {
    Toast.show({
      type: 'error',
      text1: options.text1 || 'Error',
      text2: options.text2 || 'Something went wrong',
      position: options.position || 'top',
      visibilityTime: options.visibilityTime || TOAST_DURATION.LONG,
    });
  }, []);

  const showInfo = useCallback((options: ToastOptions) => {
    Toast.show({
      type: 'info',
      text1: options.text1 || 'Info',
      text2: options.text2,
      position: options.position || 'top',
      visibilityTime: options.visibilityTime || TOAST_DURATION.SHORT,
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
  };
};

