// Error handling utilities

export const getErrorMessage = (error: unknown, defaultMessage: string = 'An unexpected error occurred'): string => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return defaultMessage;
};

export const formatActionErrorMessage = (action: string, error: unknown): string => {
  const errorMessage = getErrorMessage(error, 'Unknown error');
  return `Failed to ${action} user: ${errorMessage}`;
};

export const ERROR_MESSAGES = {
  DELETE_USER: 'Failed to delete user',
  SAVE_USER: 'Failed to save user',
  UPDATE_USER: 'Failed to update user',
  LOAD_USERS: 'Failed to load users',
  SYNC_USERS: 'Failed to sync users from server',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

