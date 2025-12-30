export const normalizeString = (str: string | undefined | null): string => {
  return str?.trim() || '';
};

export const compareStrings = (str1: string, str2: string): boolean => {
  return normalizeString(str1).toLowerCase() === normalizeString(str2).toLowerCase();
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debounced;
};

export const getInitials = (name: string, maxLength: number = 2): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
};

