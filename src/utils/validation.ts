/**
 * @deprecated This file is kept for backward compatibility with tests.
 * New code should use validationRules.ts with react-hook-form instead.
 */
import { UserFormData, FormErrors } from '../types';

export const validateUserForm = (data: UserFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Name must not exceed 50 characters';
  } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    errors.name = 'Name can only contain alphabets and spaces';
  }

  // Email validation (optional but must be valid if provided)
  if (data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  return errors;
};

