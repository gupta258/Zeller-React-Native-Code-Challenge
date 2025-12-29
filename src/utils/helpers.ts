/**
 * General utility helper functions
 */

/**
 * Trims and normalizes a string
 */
export const normalizeString = (str: string | undefined | null): string => {
  return str?.trim() || '';
};

/**
 * Case-insensitive string comparison
 */
export const compareStrings = (str1: string, str2: string): boolean => {
  return normalizeString(str1).toLowerCase() === normalizeString(str2).toLowerCase();
};

/**
 * Debounce function for search/input
 * Returns a debounced version of the function that delays execution
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function with cleanup method
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  
  // Add cleanup method to prevent memory leaks
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debounced;
};

/**
 * Format initials from a name
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
};

