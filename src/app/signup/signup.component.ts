import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../user/services/auth.service';
import { ValidationService } from '../utils/validation.service';
import { SignupData, PasswordStrength } from '../user/models/user.model';

/**
 * Signup component handling user registration
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData: SignupData = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
   * Handle signup form submission
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.errors = {};

    // Validate using validation service
    const validationErrors = this.validationService.validateSignupForm(this.signupData);
    
    if (validationErrors.length > 0) {
      // Convert array of ValidationError to Record<string, string>
      validationErrors.forEach(error => {
        this.errors[error.field] = error.message;
      });
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.authService.signup(this.signupData);

      if (result.success) {
        this.successMessage = result.message;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.errorMessage = result.message;
      }

      this.isLoading = false;
    }, 500);
  }

  /**
   * Get password strength level
   */
  getPasswordStrength(): PasswordStrength | '' {
    if (!this.signupData.password) return '';
    return this.validationService.getPasswordStrength(this.signupData.password);
  }

  /**
   * Get color class for password strength indicator
   */
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength === 'weak') return '#dc3545';
    if (strength === 'medium') return '#ffc107';
    if (strength === 'strong') return '#28a745';
    return '#e9ecef';
  }
}
