import { useMemo } from 'react';
import { ZellerCustomer, UserRole } from '../types';
import { normalizeString } from '../utils/helpers';

interface UseFilteredUsersProps {
  users: ZellerCustomer[];
  searchQuery: string;
  role?: UserRole;
}

/**
 * Custom hook to filter users by search query and role
 * Optimized with memoization and helper functions
 */
export const useFilteredUsers = ({ users, searchQuery, role }: UseFilteredUsersProps) => {
  const filteredUsers = useMemo(() => {
    let result = users;

    // Filter by search query (case-insensitive, normalized)
    const normalizedQuery = normalizeString(searchQuery).toLowerCase();
    if (normalizedQuery) {
      result = result.filter((user) => {
        const normalizedName = normalizeString(user.name).toLowerCase();
        return normalizedName.includes(normalizedQuery);
      });
    }

    // Filter by role
    if (role && role !== 'All') {
      result = result.filter((user) => user.role === role);
    }

    return result;
  }, [users, searchQuery, role]);

  return filteredUsers;
};

