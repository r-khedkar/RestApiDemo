import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SafeUser } from '../../models/user.model';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent implements OnInit {
  user: SafeUser | null = null;
  userId: number = 0;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  isDeleting: boolean = false;

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
      this.user = foundUser;
      this.isLoading = false;
    } else {
      this.errorMessage = 'User not found';
      this.isLoading = false;
    }
  }

  onConfirmDelete(): void {
    if (!this.user) return;

    this.isDeleting = true;
    this.errorMessage = '';

    // Check if trying to delete current user
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id === this.user.id) {
      this.errorMessage = 'You cannot delete your own account';
      this.isDeleting = false;
      return;
    }

    // Delete user
    const success = this.authService.deleteUser(this.user.id);
    
    if (success) {
      this.successMessage = 'User deleted successfully!';
      this.errorMessage = '';
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        this.router.navigate(['/user-list']);
      }, 1500);
    } else {
      this.errorMessage = 'Failed to delete user. Please try again.';
      this.isDeleting = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/user-list']);
  }
}
