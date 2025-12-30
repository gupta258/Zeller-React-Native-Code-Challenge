export const COLORS = {
  PRIMARY: '#6C5CE7',
  SECONDARY: '#00B894',
  ERROR: '#D63031',
  GRAY: {
    50: '#F8F9FA',
    100: '#E5E5E5',
    200: '#95A5A6',
    300: '#636E72',
    400: '#2D3436',
  },
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 2500,
  LONG: 3000,
} as const;

export const VALIDATION = {
  NAME_MAX_LENGTH: 50,
  NAME_PATTERN: /^[a-zA-Z\s]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const TABS: Array<'All' | 'Admin' | 'Manager'> = ['All', 'Admin', 'Manager'];

export const DATABASE_NAME = 'ZellerCustomers.db';

export const NAVIGATION_HEADER_HEIGHT = {
  IOS: 44,
  ANDROID: 56,
} as const;

