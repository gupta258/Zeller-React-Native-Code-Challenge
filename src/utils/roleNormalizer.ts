/**
 * Normalizes role strings to consistent format
 */
export const normalizeRole = (role: string | undefined | null): 'Admin' | 'Manager' => {
  if (!role) return 'Admin';
  
  const upperRole = role.toUpperCase();
  if (upperRole === 'ADMIN') return 'Admin';
  if (upperRole === 'MANAGER') return 'Manager';
  
  // If already in correct format
  if (role === 'Admin' || role === 'Manager') {
    return role;
  }
  
  // Default to Admin if unrecognized
  return 'Admin';
};

