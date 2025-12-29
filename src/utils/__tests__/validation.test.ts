import { validateUserForm } from '../validation';
import { UserFormData } from '../../types';

describe('validateUserForm', () => {
  it('should return no errors for valid data', () => {
    const validData: UserFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };

    const errors = validateUserForm(validData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should return error if name is empty', () => {
    const data: UserFormData = {
      name: '',
      email: 'john@example.com',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.name).toBe('Name is required');
  });

  it('should return error if name contains special characters', () => {
    const data: UserFormData = {
      name: 'John@Doe',
      email: 'john@example.com',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.name).toBe('Name can only contain alphabets and spaces');
  });

  it('should return error if name exceeds 50 characters', () => {
    const data: UserFormData = {
      name: 'A'.repeat(51),
      email: 'john@example.com',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.name).toBe('Name must not exceed 50 characters');
  });

  it('should return error for invalid email format', () => {
    const data: UserFormData = {
      name: 'John Doe',
      email: 'invalid-email',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.email).toBe('Please enter a valid email address');
  });

  it('should not return error if email is empty', () => {
    const data: UserFormData = {
      name: 'John Doe',
      email: '',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.email).toBeUndefined();
  });

  it('should accept valid email', () => {
    const data: UserFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Manager',
    };

    const errors = validateUserForm(data);
    expect(errors.email).toBeUndefined();
  });

  it('should accept name with spaces', () => {
    const data: UserFormData = {
      name: 'John Michael Doe',
      email: 'john@example.com',
      role: 'Admin',
    };

    const errors = validateUserForm(data);
    expect(errors.name).toBeUndefined();
  });
});

