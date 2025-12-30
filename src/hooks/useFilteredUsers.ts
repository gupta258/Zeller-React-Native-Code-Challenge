import { useMemo } from 'react';
import { ZellerCustomer, UserRole } from '../types';
import { normalizeString } from '../utils/helpers';

interface UseFilteredUsersProps {
  users: ZellerCustomer[];
  searchQuery: string;
  role?: UserRole;
}

export const useFilteredUsers = ({ users, searchQuery, role }: UseFilteredUsersProps) => {
  const filteredUsers = useMemo(() => {
    let result = users;

    const normalizedQuery = normalizeString(searchQuery).toLowerCase();
    if (normalizedQuery) {
      result = result.filter((user) => {
        const normalizedName = normalizeString(user.name).toLowerCase();
        return normalizedName.includes(normalizedQuery);
      });
    }

    if (role && role !== 'All') {
      result = result.filter((user) => user.role === role);
    }

    return result;
  }, [users, searchQuery, role]);

  return filteredUsers;
};

