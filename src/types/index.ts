export interface ZellerCustomer {
  id: string;
  name: string;
  email?: string;
  role: 'Admin' | 'Manager';
}

export interface ZellerCustomerConnection {
  items: ZellerCustomer[];
  nextToken?: string | null;
}

export type UserRole = 'Admin' | 'Manager' | 'All';

export interface UserFormData {
  name: string;
  email: string;
  role: 'Admin' | 'Manager';
}

export interface FormErrors {
  name?: string;
  email?: string;
}

