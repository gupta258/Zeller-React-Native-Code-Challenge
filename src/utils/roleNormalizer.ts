export const normalizeRole = (role: string | undefined | null): 'Admin' | 'Manager' => {
  if (!role) return 'Admin';
  
  const upperRole = role.toUpperCase();
  if (upperRole === 'ADMIN') return 'Admin';
  if (upperRole === 'MANAGER') return 'Manager';
  
  if (role === 'Admin' || role === 'Manager') {
    return role;
  }
  
  return 'Admin';
};

