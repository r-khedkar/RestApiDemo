/**
 * User model representing authenticated user data
 */
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  createdAt?: Date;
  lastLogin?: Date;
}

/**
 * User without sensitive information (for display purposes)
 */
export interface SafeUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  createdAt?: Date;
  lastLogin?: Date;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

/**
 * Signup/Registration data
 */
export interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'medium' | 'strong';

/**
 * Form validation error
 */
export interface ValidationError {
  field: string;
  message: string;
}
