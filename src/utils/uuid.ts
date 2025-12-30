export const generateUUID = (): string => {
  const getRandomHex = (): string => {
    return Math.floor(Math.random() * 16).toString(16);
  };
  
  const randomHex = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += getRandomHex();
    }
    return result;
  };
  
  const uuid = [
    randomHex(8),
    randomHex(4),
    '4' + randomHex(3),
    ((Math.floor(Math.random() * 4) + 8).toString(16)) + randomHex(3),
    randomHex(12),
  ].join('-');
  
  return uuid;
};

