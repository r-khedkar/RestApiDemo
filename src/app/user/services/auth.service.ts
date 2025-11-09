import { Injectable } from '@angular/core';
import { User, SafeUser, AuthResponse, SignupData } from '../models/user.model';
import { MOCK_USERS, STORAGE_KEYS, AUTH_MESSAGES } from '../constants/user.constants';

/**
 * Authentication service handling user login, signup, and session management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [...MOCK_USERS];
  private currentUser: User | null = null;

  constructor() {
    this.loadCurrentUser();
  }

  /**
   * Load current user from localStorage on service initialization
   */
  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
  }

  /**
   * Authenticate user with email/username and password
   */
  login(emailOrUsername: string, password: string): AuthResponse {
    const user = this.mockUsers.find(
      u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (user) {
      user.lastLogin = new Date();
      this.currentUser = user;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      
      return {
        success: true,
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        user: user
      };
    }

    return {
      success: false,
      message: AUTH_MESSAGES.LOGIN_FAILED
    };
  }

  /**
   * Register a new user
   */
  signup(signupData: SignupData): AuthResponse {
    const existingUser = this.mockUsers.find(
      u => u.email === signupData.email || u.username === signupData.username
    );

    if (existingUser) {
      return {
        success: false,
        message: AUTH_MESSAGES.USER_EXISTS
      };
    }

    const newUser: User = {
      id: this.mockUsers.length + 1,
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      fullName: signupData.fullName,
      createdAt: new Date(),
      lastLogin: new Date()
    };

    this.mockUsers.push(newUser);

    return {
      success: true,
      message: AUTH_MESSAGES.SIGNUP_SUCCESS,
      user: newUser
    };
  }

  /**
   * Log out current user
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Get current user without sensitive information
   */
  getSafeCurrentUser(): SafeUser | null {
    if (!this.currentUser) return null;
    
    const { password, ...safeUser } = this.currentUser;
    return safeUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Backward compatibility method
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Get all users (excluding passwords)
   */
  getAllUsers(): SafeUser[] {
    return this.mockUsers.map(({ password, ...user }) => user);
  }

  /**
   * Update user information
   */
  updateUser(updatedUser: SafeUser): boolean {
    const userIndex = this.mockUsers.findIndex(u => u.id === updatedUser.id);
    
    if (userIndex === -1) {
      return false;
    }

    // Keep the existing password and update other fields
    this.mockUsers[userIndex] = {
      ...this.mockUsers[userIndex],
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      email: updatedUser.email,
      lastLogin: new Date()
    };

    // Update localStorage
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.mockUsers));
    
    return true;
  }

  /**
   * Delete user by ID
   */
  deleteUser(userId: number): boolean {
    const userIndex = this.mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return false;
    }

    // Don't allow deleting the currently logged-in user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      return false;
    }

    this.mockUsers.splice(userIndex, 1);
    
    // Update localStorage
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.mockUsers));
    
    return true;
  }

  /**
   * Search users by name, username, or email
   */
  searchUsers(searchTerm: string): SafeUser[] {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
      return this.getAllUsers();
    }
    
    return this.mockUsers
      .filter(user => 
        user.fullName.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      )
      .map(({ password, ...user }) => user);
  }
}
