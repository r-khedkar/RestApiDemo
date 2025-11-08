import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../utils/validation.service';
import { LoginCredentials } from '../models/user.model';

/**
 * Login component handling user authentication
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginCredentials = {
    emailOrUsername: '',
    password: ''
  };
  
  errors: Record<string, string> = {};
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
    private router: Router
  ) {}

  /**
   * Validate form fields
   */
  private validateForm(): boolean {
    this.errors = {};
    this.errorMessage = '';

    if (!this.credentials.emailOrUsername.trim()) {
      this.errors['emailOrUsername'] = 'Email or username is required';
      return false;
    }

    if (!this.credentials.password) {
      this.errors['password'] = 'Password is required';
      return false;
    }

    if (this.credentials.password.length < 6) {
      this.errors['password'] = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }

  /**
   * Handle login form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.login(
        this.credentials.emailOrUsername,
        this.credentials.password
      );
      
      if (result.success) {
        this.successMessage = result.message;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.errorMessage = result.message;
      }
      
      this.isLoading = false;
    }, 500);
  }
}
