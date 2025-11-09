import { Injectable } from '@angular/core';
import { VALIDATION_RULES, AUTH_MESSAGES } from '../user/constants/user.constants';
import { ValidationError, PasswordStrength } from '../user/models/user.model';

/**
 * Service for form validation and password strength checking
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  /**
   * Validate email format
   */
  validateEmail(email: string): ValidationError | null {
    if (!email || email.trim().length === 0) {
      return { field: 'email', message: AUTH_MESSAGES.REQUIRED_FIELD };
    }
    
    if (!VALIDATION_RULES.EMAIL_PATTERN.test(email)) {
      return { field: 'email', message: AUTH_MESSAGES.INVALID_EMAIL };
    }
    
    return null;
  }

  /**
   * Validate username format and length
   */
  validateUsername(username: string): ValidationError | null {
    if (!username || username.trim().length === 0) {
      return { field: 'username', message: AUTH_MESSAGES.REQUIRED_FIELD };
    }
    
    if (username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH || 
        username.length > VALIDATION_RULES.MAX_USERNAME_LENGTH) {
      return { 
        field: 'username', 
        message: `Username must be between ${VALIDATION_RULES.MIN_USERNAME_LENGTH} and ${VALIDATION_RULES.MAX_USERNAME_LENGTH} characters` 
      };
    }
    
    if (!VALIDATION_RULES.USERNAME_PATTERN.test(username)) {
      return { field: 'username', message: AUTH_MESSAGES.INVALID_USERNAME };
    }
    
    return null;
  }

  /**
   * Validate password strength and length
   */
  validatePassword(password: string): ValidationError | null {
    if (!password || password.length === 0) {
      return { field: 'password', message: AUTH_MESSAGES.REQUIRED_FIELD };
    }
    
    if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
      return { field: 'password', message: AUTH_MESSAGES.WEAK_PASSWORD };
    }
    
    if (password.length > VALIDATION_RULES.MAX_PASSWORD_LENGTH) {
      return { 
        field: 'password', 
        message: `Password must not exceed ${VALIDATION_RULES.MAX_PASSWORD_LENGTH} characters` 
      };
    }
    
    return null;
  }

  /**
   * Validate password confirmation match
   */
  validatePasswordMatch(password: string, confirmPassword: string): ValidationError | null {
    if (password !== confirmPassword) {
      return { field: 'confirmPassword', message: AUTH_MESSAGES.PASSWORDS_MISMATCH };
    }
    
    return null;
  }

  /**
   * Calculate password strength
   */
  getPasswordStrength(password: string): PasswordStrength {
    if (!password) return 'weak';
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++; // lowercase
    if (/[A-Z]/.test(password)) strength++; // uppercase
    if (/[0-9]/.test(password)) strength++; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength++; // special characters
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }

  /**
   * Validate required field
   */
  validateRequired(value: string, fieldName: string): ValidationError | null {
    if (!value || value.trim().length === 0) {
      return { field: fieldName, message: AUTH_MESSAGES.REQUIRED_FIELD };
    }
    
    return null;
  }

  /**
   * Validate all signup fields
   */
  validateSignupForm(data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  }): ValidationError[] {
    const errors: ValidationError[] = [];
    
    // Full name validation
    const fullNameError = this.validateRequired(data.fullName, 'fullName');
    if (fullNameError) errors.push(fullNameError);
    
    // Username validation
    const usernameError = this.validateUsername(data.username);
    if (usernameError) errors.push(usernameError);
    
    // Email validation
    const emailError = this.validateEmail(data.email);
    if (emailError) errors.push(emailError);
    
    // Password validation
    const passwordError = this.validatePassword(data.password);
    if (passwordError) errors.push(passwordError);
    
    // Password match validation
    const matchError = this.validatePasswordMatch(data.password, data.confirmPassword);
    if (matchError) errors.push(matchError);
    
    // Terms agreement validation
    if (!data.agreeTerms) {
      errors.push({ field: 'agreeTerms', message: AUTH_MESSAGES.TERMS_NOT_AGREED });
    }
    
    return errors;
  }

  /**
   * Validate login fields
   */
  validateLoginForm(emailOrUsername: string, password: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    // Email/Username validation
    const credentialError = this.validateRequired(emailOrUsername, 'emailOrUsername');
    if (credentialError) errors.push(credentialError);
    
    // Password validation
    const passwordError = this.validateRequired(password, 'password');
    if (passwordError) errors.push(passwordError);
    
    return errors;
  }
}
