/**
 * Generate a UUID v4 compatible string
 * React Native compatible implementation using Math.random()
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export const generateUUID = (): string => {
  // Generate random hex digits
  const getRandomHex = (): string => {
    return Math.floor(Math.random() * 16).toString(16);
  };
  
  // Generate random hex string of specified length
  const randomHex = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += getRandomHex();
    }
    return result;
  };
  
  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // where y is one of 8, 9, a, or b
  const uuid = [
    randomHex(8),
    randomHex(4),
    '4' + randomHex(3), // Version 4
    ((Math.floor(Math.random() * 4) + 8).toString(16)) + randomHex(3), // Variant (8, 9, a, b)
    randomHex(12),
  ].join('-');
  
  return uuid;
};

