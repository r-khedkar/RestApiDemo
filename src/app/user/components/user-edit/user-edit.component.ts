import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SafeUser } from '../../models/user.model';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  user: SafeUser | null = null;
  originalUser: SafeUser | null = null;
  userId: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id, 10);
      this.loadUser();
    } else {
      this.errorMessage = 'Invalid user ID';
      this.isLoading = false;
    }
  }

  loadUser(): void {
    const users = this.authService.getAllUsers();
    const foundUser = users.find(u => u.id === this.userId);
    
    if (foundUser) {
      // Create a deep copy to avoid mutating the original
      this.user = { ...foundUser };
      this.originalUser = { ...foundUser };
      this.isLoading = false;
    } else {
      this.errorMessage = 'User not found';
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (!this.user) return;

    // Validate form
    if (!this.user.fullName || !this.user.username || !this.user.email) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Update user
    const success = this.authService.updateUser(this.user);
    
    if (success) {
      this.successMessage = 'User updated successfully!';
      this.errorMessage = '';
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        this.router.navigate(['/user-list']);
      }, 1500);
    } else {
      this.errorMessage = 'Failed to update user';
      this.successMessage = '';
    }
  }

  onCancel(): void {
    this.router.navigate(['/user-list']);
  }

  hasChanges(): boolean {
    if (!this.user || !this.originalUser) return false;
    
    return this.user.fullName !== this.originalUser.fullName ||
           this.user.username !== this.originalUser.username ||
           this.user.email !== this.originalUser.email;
  }
}
