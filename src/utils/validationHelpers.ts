import { RegisterOptions, FieldValues } from 'react-hook-form';
import { normalizeString } from './helpers';

// Check for duplicate names
export const createDuplicateNameValidator = <TItem extends { id?: string }>(
  existingItems: TItem[],
  excludeId?: string,
  nameGetter: (item: TItem) => string = (item) => (item as any).name,
  errorMessage: string = 'A customer with this name already exists'
): ((value: string) => true | string) => {
  return (value: string) => {
    if (!value) return true;
    
    const normalizedValue = normalizeString(value).toLowerCase();
    const duplicate = existingItems.find((item) => {
      if (excludeId && item.id === excludeId) return false;
      const itemName = normalizeString(nameGetter(item)).toLowerCase();
      return itemName === normalizedValue;
    });
    
    return !duplicate || errorMessage;
  };
};

// Combine base validation with duplicate check
export const createNameValidationWithDuplicateCheck = <T extends FieldValues, TItem extends { id?: string }>(
  baseRules: RegisterOptions<T>,
  existingItems: TItem[],
  excludeId?: string,
  nameGetter: (item: TItem) => string = (item) => (item as any).name
): RegisterOptions<T> => {
  return {
    ...baseRules,
    validate: async (value: string) => {
      if (baseRules.required && (!value || normalizeString(value).length === 0)) {
        return typeof baseRules.required === 'string' ? baseRules.required : 'This field is required';
      }
      
      if (baseRules.maxLength) {
        const maxLengthRule = baseRules.maxLength;
        if (typeof maxLengthRule === 'object' && 'value' in maxLengthRule) {
          if (value.length > maxLengthRule.value) {
            return maxLengthRule.message || `Value must not exceed ${maxLengthRule.value} characters`;
          }
        }
      }
      
      if (baseRules.pattern) {
        const patternRule = baseRules.pattern;
        if (typeof patternRule === 'object' && 'value' in patternRule) {
          if (!patternRule.value.test(value)) {
            return patternRule.message || 'Invalid format';
          }
        }
      }
      
      const duplicateValidator = createDuplicateNameValidator(existingItems, excludeId, nameGetter);
      const duplicateResult = duplicateValidator(value);
      
      return duplicateResult === true ? true : duplicateResult;
    },
  };
};

