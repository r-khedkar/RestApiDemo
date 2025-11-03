import { Injectable } from '@angular/core';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      fullName: 'John Doe'
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password456',
      fullName: 'Jane Smith'
    },
    {
      id: 3,
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      fullName: 'Admin User'
    }
  ];

  private currentUser: User | null = null;

  constructor() { }

  login(emailOrUsername: string, password: string): { success: boolean; message: string; user?: User } {
    const user = this.mockUsers.find(
      u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, message: 'Login successful!', user };
    }

    return { success: false, message: 'Invalid credentials. Please try again.' };
  }

  signup(userData: { username: string; email: string; password: string; fullName: string }): { success: boolean; message: string } {
    // Check if user already exists
    const existingUser = this.mockUsers.find(
      u => u.email === userData.email || u.username === userData.username
    );

    if (existingUser) {
      return { success: false, message: 'User with this email or username already exists.' };
    }

    // Create new user
    const newUser: User = {
      id: this.mockUsers.length + 1,
      ...userData
    };

    this.mockUsers.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true, message: 'Account created successfully!' };
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
