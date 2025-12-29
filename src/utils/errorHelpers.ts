/**
 * Utility functions for error handling and formatting
 */

/**
 * Extracts a user-friendly error message from an error object
 * @param error - Error object (can be Error, string, or unknown)
 * @param defaultMessage - Default message if error cannot be extracted
 * @returns User-friendly error message
 */
export const getErrorMessage = (error: unknown, defaultMessage: string = 'An unexpected error occurred'): string => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return defaultMessage;
};

/**
 * Formats error message for user actions (save, delete, etc.)
 * @param action - Action name (e.g., 'save', 'delete', 'update')
 * @param error - Error object
 * @returns Formatted error message
 */
export const formatActionErrorMessage = (action: string, error: unknown): string => {
  const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);
  const errorMessage = getErrorMessage(error, 'Unknown error');
  return `Failed to ${action} user: ${errorMessage}`;
};

/**
 * Common error messages for user actions
 */
export const ERROR_MESSAGES = {
  DELETE_USER: 'Failed to delete user',
  SAVE_USER: 'Failed to save user',
  UPDATE_USER: 'Failed to update user',
  LOAD_USERS: 'Failed to load users',
  SYNC_USERS: 'Failed to sync users from server',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

