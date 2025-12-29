import { RegisterOptions, FieldValues } from 'react-hook-form';
import { VALIDATION } from '../constants';

/**
 * Common validation rules for react-hook-form
 * These are generic and can be used with any form type
 */

export const nameValidationRules = <T extends FieldValues>(): RegisterOptions<T> => ({
  required: 'Name is required',
  maxLength: {
    value: VALIDATION.NAME_MAX_LENGTH,
    message: `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`,
  },
  pattern: {
    value: VALIDATION.NAME_PATTERN,
    message: 'Name can only contain alphabets and spaces',
  },
});

export const emailValidationRules = <T extends FieldValues>(): RegisterOptions<T> => ({
  validate: (value: string) => {
    // Only validate if email is provided (it's optional)
    if (value && value.trim().length > 0) {
      return VALIDATION.EMAIL_PATTERN.test(value) || 'Please enter a valid email address';
    }
    return true;
  },
});

/**
 * Helper function to create required field validation
 */
export const createRequiredRule = <T extends FieldValues>(fieldName: string): RegisterOptions<T> => ({
  required: `${fieldName} is required`,
});

/**
 * Helper function to create max length validation
 */
export const createMaxLengthRule = <T extends FieldValues>(
  maxLength: number,
  fieldName: string
): RegisterOptions<T> => ({
  maxLength: {
    value: maxLength,
    message: `${fieldName} must not exceed ${maxLength} characters`,
  },
});

/**
 * Helper function to create pattern validation
 */
export const createPatternRule = <T extends FieldValues>(
  pattern: RegExp,
  message: string
): RegisterOptions<T> => ({
  pattern: {
    value: pattern,
    message,
  },
});

