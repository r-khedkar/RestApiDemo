import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { SafeUser } from '../models/user.model';

/**
 * User list component displaying all registered users with search functionality
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: SafeUser[] = [];
  filteredUsers: SafeUser[] = [];
  searchTerm: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load all users from auth service
   */
  loadUsers(): void {
    this.users = this.authService.getAllUsers();
    this.filteredUsers = [...this.users];
  }

  /**
   * Filter users based on search term
   */
  searchUsers(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchTerm = searchValue;
    this.filteredUsers = this.authService.searchUsers(searchValue);
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  /**
   * Get avatar color based on user ID
   */
  getAvatarColor(id: number): string {
    const colors = ['#11998e', '#38ef7d', '#f093fb', '#4facfe', '#fa709a'];
    return colors[id % colors.length];
  }
}
