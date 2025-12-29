import { open } from 'react-native-quick-sqlite';
import { ZellerCustomer } from '../types';
import { normalizeRole } from '../utils/roleNormalizer';
import { DATABASE_NAME } from '../constants';

let db: ReturnType<typeof open> | null = null;

export const initDatabase = async (): Promise<ReturnType<typeof open>> => {
  if (db) {
    return db;
  }

  try {
    db = open({
      name: DATABASE_NAME,
      location: 'default',
    });

    // Create table if it doesn't exist
    db.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    return db;
  } catch (error) {
    console.error('[Database] Error initializing database:', error);
    throw error;
  }
};

export const getDatabase = async (): Promise<ReturnType<typeof open>> => {
  if (!db) {
    return await initDatabase();
  }
  return db;
};

export const getAllCustomers = async (): Promise<ZellerCustomer[]> => {
  try {
    const database = await getDatabase();
    const result = database.execute('SELECT * FROM customers ORDER BY name ASC');
    
    const customers: ZellerCustomer[] = [];
    
    // react-native-quick-sqlite returns rows with _array property
    if (result.rows && result.rows.length > 0) {
      const rowsArray = result.rows._array;
      
      if (rowsArray && rowsArray.length > 0) {
        for (let i = 0; i < rowsArray.length; i++) {
          const row = rowsArray[i];
          customers.push({
            id: row.id,
            name: row.name,
            email: row.email || undefined,
            role: normalizeRole(row.role),
          });
        }
      }
    }

    return customers;
  } catch (error) {
    console.error('[Database] Error in getAllCustomers:', error);
    throw error;
  }
};

export const getCustomerById = async (id: string): Promise<ZellerCustomer | null> => {
  try {
    const database = await getDatabase();
    const result = database.execute('SELECT * FROM customers WHERE id = ?', [id]);

    if (result.rows && result.rows.length > 0) {
      const row = result.rows._array[0];
      if (row) {
        return {
          id: row.id,
          name: row.name,
          email: row.email || undefined,
          role: normalizeRole(row.role),
        };
      }
    }

    return null;
  } catch (error) {
    console.error('[Database] Error in getCustomerById:', error);
    throw error;
  }
};

export const getCustomerByName = async (name: string, excludeId?: string): Promise<ZellerCustomer | null> => {
  try {
    const database = await getDatabase();
    const trimmedName = name.trim().toLowerCase();
    
    let result;
    if (excludeId) {
      result = database.execute('SELECT * FROM customers WHERE LOWER(TRIM(name)) = ? AND id != ?', [trimmedName, excludeId]);
    } else {
      result = database.execute('SELECT * FROM customers WHERE LOWER(TRIM(name)) = ?', [trimmedName]);
    }

    if (result.rows && result.rows.length > 0) {
      const row = result.rows._array[0];
      if (row) {
        return {
          id: row.id,
          name: row.name,
          email: row.email || undefined,
          role: normalizeRole(row.role),
        };
      }
    }

    return null;
  } catch (error) {
    console.error('[Database] Error in getCustomerByName:', error);
    throw error;
  }
};

export const insertCustomer = async (customer: ZellerCustomer): Promise<void> => {
  try {
    // Check for duplicate name
    const existingCustomer = await getCustomerByName(customer.name);
    if (existingCustomer) {
      throw new Error(`A customer with the name "${customer.name}" already exists`);
    }

    const database = await getDatabase();
    database.execute(
      'INSERT INTO customers (id, name, email, role) VALUES (?, ?, ?, ?)',
      [customer.id, customer.name, customer.email || null, customer.role]
    );
  } catch (error) {
    console.error('Error inserting customer:', error);
    throw error;
  }
};

export const updateCustomer = async (customer: ZellerCustomer): Promise<void> => {
  try {
    // Check for duplicate name (excluding current customer)
    const existingCustomer = await getCustomerByName(customer.name, customer.id);
    if (existingCustomer) {
      throw new Error(`A customer with the name "${customer.name}" already exists`);
    }

    const database = await getDatabase();
    database.execute(
      'UPDATE customers SET name = ?, email = ?, role = ?, updated_at = strftime("%s", "now") WHERE id = ?',
      [customer.name, customer.email || null, customer.role, customer.id]
    );
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    const database = await getDatabase();
    database.execute('DELETE FROM customers WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const syncCustomersFromAPI = async (
  customers: ZellerCustomer[]
): Promise<void> => {
  const database = await getDatabase();
  
  // Clear existing data and insert new
  database.execute('DELETE FROM customers');
  
  // Deduplicate by name (case-insensitive) before inserting
  const seenNames = new Set<string>();
  const uniqueCustomers = customers.filter((customer) => {
    const normalizedName = customer.name.trim().toLowerCase();
    if (seenNames.has(normalizedName)) {
      return false; // Skip duplicate
    }
    seenNames.add(normalizedName);
    return true;
  });
  
  // Use batch insert for better performance
  for (const customer of uniqueCustomers) {
    try {
      await insertCustomer(customer);
    } catch (error) {
      // Skip if duplicate still exists (shouldn't happen after deduplication, but safe guard)
      if (error instanceof Error && error.message.includes('already exists')) {
        continue;
      }
      throw error;
    }
  }
};
