import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ZellerCustomer } from '../types';
import { getAllCustomers, syncCustomersFromAPI } from '../services/database';
import { fetchZellerCustomers } from '../services/graphql';
import { initDatabase } from '../services/database';

interface UserContextType {
  users: ZellerCustomer[];
  loading: boolean;
  refreshing: boolean;
  refreshUsers: () => Promise<void>;
  syncFromAPI: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<ZellerCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const customers = await getAllCustomers();
      setUsers(customers);
    } catch (error) {
      console.error('[UserContext] Error loading users:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshUsers = useCallback(async () => {
    setRefreshing(true);
    await loadUsers();
  }, [loadUsers]);

  const syncFromAPI = useCallback(async () => {
    try {
      setRefreshing(true);
      const apiCustomers = await fetchZellerCustomers();
      await syncCustomersFromAPI(apiCustomers);
      await loadUsers();
    } catch (error) {
      console.error('Error syncing from API:', error);
      setRefreshing(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        const customers = await getAllCustomers();
        
        if (customers.length === 0) {
          try {
            const apiCustomers = await fetchZellerCustomers();
            if (apiCustomers.length > 0) {
              await syncCustomersFromAPI(apiCustomers);
              await loadUsers();
            } else {
              await loadUsers();
            }
          } catch (apiError) {
            console.error('[UserContext] Auto-sync failed:', apiError);
            await loadUsers();
          }
        } else {
          await loadUsers();
        }
      } catch (error) {
        console.error('[UserContext] Error initializing:', error);
        setLoading(false);
      }
    };

    initialize();
  }, [loadUsers]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        refreshing,
        refreshUsers,
        syncFromAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

