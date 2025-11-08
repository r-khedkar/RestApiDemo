import { User } from '../models/user.model';

/**
 * Mock user data for development
 * In production, this would be fetched from a backend API
 */
export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    fullName: 'John Doe',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date()
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password456',
    fullName: 'Jane Smith',
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date()
  },
  {
    id: 3,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    fullName: 'Admin User',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 4,
    username: 'alice_wonder',
    email: 'alice@example.com',
    password: 'alice123',
    fullName: 'Alice Wonderland',
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date()
  },
  {
    id: 5,
    username: 'bob_builder',
    email: 'bob@example.com',
    password: 'bob123',
    fullName: 'Bob Builder',
    createdAt: new Date('2024-04-05'),
    lastLogin: new Date()
  }
];

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  CURRENT_USER: 'currentUser',
  AUTH_TOKEN: 'authToken',
  REMEMBER_ME: 'rememberMe'
} as const;

/**
 * Validation constants
 */
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  USERNAME_PATTERN: /^[a-zA-Z0-9_-]+$/
} as const;

/**
 * Authentication messages
 */
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  LOGIN_FAILED: 'Invalid email/username or password',
  SIGNUP_SUCCESS: 'Account created successfully! Redirecting to login...',
  SIGNUP_FAILED: 'Failed to create account',
  LOGOUT_SUCCESS: 'Logged out successfully',
  USER_EXISTS: 'Username or email already exists',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  WEAK_PASSWORD: 'Password must be at least 6 characters long',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_USERNAME: 'Username can only contain letters, numbers, underscores, and hyphens',
  TERMS_NOT_AGREED: 'Please agree to the terms and conditions',
  REQUIRED_FIELD: 'This field is required'
} as const;
