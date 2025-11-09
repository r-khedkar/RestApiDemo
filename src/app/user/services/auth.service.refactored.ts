import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { User, SafeUser, AuthResponse, SignupData, LoginCredentials } from '../models/user.model';
import { MOCK_USERS, STORAGE_KEYS, AUTH_MESSAGES } from '../constants/user.constants';

/**
 * Enhanced Authentication service with RxJS patterns
 * Handles user login, signup, and session management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = this.loadUsersFromStorage();
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject$.asObservable();

  constructor() {
    this.loadCurrentUser();
  }

  /**
   * Load users from localStorage or use defaults
   */
  private loadUsersFromStorage(): User[] {
    const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch (error) {
        console.error('Failed to parse stored users:', error);
      }
    }
    return [...MOCK_USERS];
  }

  /**
   * Save users to localStorage
   */
  private saveUsersToStorage(): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.mockUsers));
  }

  /**
   * Load current user from localStorage on service initialization
   */
  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject$.next(user);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
  }

  /**
   * Authenticate user with credentials
   * Returns Observable for better async handling
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulate API delay
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.mockUsers.find(
          u => (u.email === credentials.emailOrUsername || 
                u.username === credentials.emailOrUsername) && 
                u.password === credentials.password
        );

        if (user) {
          user.lastLogin = new Date();
          this.currentUserSubject$.next(user);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, this.generateToken(user));
          
          // Update user in storage
          this.saveUsersToStorage();

          return {
            success: true,
            message: AUTH_MESSAGES.LOGIN_SUCCESS,
            user: user
          };
        }

        throw new Error(AUTH_MESSAGES.LOGIN_FAILED);
      }),
      catchError(error => {
        return of({
          success: false,
          message: error.message || AUTH_MESSAGES.LOGIN_FAILED
        });
      })
    );
  }

  /**
   * Register a new user
   * Returns Observable for consistency
   */
  signup(signupData: SignupData): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const existingUser = this.mockUsers.find(
          u => u.email === signupData.email || u.username === signupData.username
        );

        if (existingUser) {
          throw new Error(AUTH_MESSAGES.USER_EXISTS);
        }

        const newUser: User = {
          id: this.getNextUserId(),
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          fullName: signupData.fullName,
          createdAt: new Date(),
          lastLogin: new Date()
        };

        this.mockUsers.push(newUser);
        this.saveUsersToStorage();

        return {
          success: true,
          message: AUTH_MESSAGES.SIGNUP_SUCCESS,
          user: newUser
        };
      }),
      catchError(error => {
        return of({
          success: false,
          message: error.message || 'Signup failed'
        });
      })
    );
  }

  /**
   * Log out current user
   */
  logout(): void {
    this.currentUserSubject$.next(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject$.value !== null;
  }

  /**
   * Get current logged-in user
   */
  getCurrentUser(): SafeUser | null {
    const user = this.currentUserSubject$.value;
    if (user) {
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
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
  updateUser(updatedUser: SafeUser): Observable<boolean> {
    return of(null).pipe(
      delay(300),
      map(() => {
        const userIndex = this.mockUsers.findIndex(u => u.id === updatedUser.id);
        
        if (userIndex === -1) {
          throw new Error('User not found');
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
        this.saveUsersToStorage();
        
        // If updating current user, update the session
        const currentUser = this.currentUserSubject$.value;
        if (currentUser && currentUser.id === updatedUser.id) {
          this.currentUserSubject$.next(this.mockUsers[userIndex]);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.mockUsers[userIndex]));
        }

        return true;
      }),
      catchError(error => {
        console.error('Update user error:', error);
        return of(false);
      })
    );
  }

  /**
   * Delete user by ID
   */
  deleteUser(userId: number): Observable<boolean> {
    return of(null).pipe(
      delay(300),
      map(() => {
        const userIndex = this.mockUsers.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          throw new Error('User not found');
        }

        // Don't allow deleting the currently logged-in user
        const currentUser = this.currentUserSubject$.value;
        if (currentUser && currentUser.id === userId) {
          throw new Error('Cannot delete your own account');
        }

        this.mockUsers.splice(userIndex, 1);
        
        // Update localStorage
        this.saveUsersToStorage();
        
        return true;
      }),
      catchError(error => {
        console.error('Delete user error:', error);
        return of(false);
      })
    );
  }

  /**
   * Search users by name, username, or email
   */
  searchUsers(searchTerm: string): Observable<SafeUser[]> {
    return of(null).pipe(
      delay(200),
      map(() => {
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
      })
    );
  }

  /**
   * Generate a simple token for the user (mock implementation)
   */
  private generateToken(user: User): string {
    return btoa(`${user.id}:${user.username}:${Date.now()}`);
  }

  /**
   * Get next available user ID
   */
  private getNextUserId(): number {
    if (this.mockUsers.length === 0) {
      return 1;
    }
    return Math.max(...this.mockUsers.map(u => u.id)) + 1;
  }
}
