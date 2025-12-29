import { RegisterOptions, FieldValues } from 'react-hook-form';
import { normalizeString } from './helpers';

/**
 * Utility functions for creating custom validation rules
 */

/**
 * Creates a validation function to check for duplicate names in a list
 * @param existingItems - Array of items with name property
 * @param excludeId - Optional ID to exclude from duplicate check (for edit mode)
 * @param nameGetter - Function to get name from item (default: item.name)
 * @param errorMessage - Custom error message
 * @returns Validation function that returns true if valid, or error message if duplicate found
 */
export const createDuplicateNameValidator = <TItem extends { id?: string }>(
  existingItems: TItem[],
  excludeId?: string,
  nameGetter: (item: TItem) => string = (item) => (item as any).name,
  errorMessage: string = 'A customer with this name already exists'
): ((value: string) => true | string) => {
  return (value: string) => {
    if (!value) return true; // Let required validation handle empty values
    
    const normalizedValue = normalizeString(value).toLowerCase();
    const duplicate = existingItems.find((item) => {
      // Skip the item being edited
      if (excludeId && item.id === excludeId) return false;
      
      const itemName = normalizeString(nameGetter(item)).toLowerCase();
      return itemName === normalizedValue;
    });
    
    return !duplicate || errorMessage;
  };
};

/**
 * Creates a validation rule that combines base validation with duplicate check
 * @param baseRules - Base validation rules (e.g., from nameValidationRules)
 * @param existingItems - Array of items to check for duplicates
 * @param excludeId - Optional ID to exclude from duplicate check
 * @param nameGetter - Function to get name from item
 */
export const createNameValidationWithDuplicateCheck = <T extends FieldValues, TItem extends { id?: string }>(
  baseRules: RegisterOptions<T>,
  existingItems: TItem[],
  excludeId?: string,
  nameGetter: (item: TItem) => string = (item) => (item as any).name
): RegisterOptions<T> => {
  return {
    ...baseRules,
    validate: async (value: string) => {
      // First run base validation
      if (baseRules.required && (!value || normalizeString(value).length === 0)) {
        return typeof baseRules.required === 'string' ? baseRules.required : 'This field is required';
      }
      
      // Check maxLength validation
      if (baseRules.maxLength) {
        const maxLengthRule = baseRules.maxLength;
        if (typeof maxLengthRule === 'object' && 'value' in maxLengthRule) {
          if (value.length > maxLengthRule.value) {
            return maxLengthRule.message || `Value must not exceed ${maxLengthRule.value} characters`;
          }
        }
      }
      
      // Check pattern validation
      if (baseRules.pattern) {
        const patternRule = baseRules.pattern;
        if (typeof patternRule === 'object' && 'value' in patternRule) {
          if (!patternRule.value.test(value)) {
            return patternRule.message || 'Invalid format';
          }
        }
      }
      
      // Then check for duplicates
      const duplicateValidator = createDuplicateNameValidator(existingItems, excludeId, nameGetter);
      const duplicateResult = duplicateValidator(value);
      
      // Return error message if duplicate found, otherwise pass validation
      return duplicateResult === true ? true : duplicateResult;
    },
  };
};

