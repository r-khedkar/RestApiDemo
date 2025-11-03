import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Get mock users from auth service
    this.users = [
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
      },
      {
        id: 4,
        username: 'bob_wilson',
        email: 'bob@example.com',
        password: 'password789',
        fullName: 'Bob Wilson'
      },
      {
        id: 5,
        username: 'alice_brown',
        email: 'alice@example.com',
        password: 'password321',
        fullName: 'Alice Brown'
      }
    ];
    this.filteredUsers = [...this.users];
  }

  searchUsers(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.fullName.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.username.toLowerCase().includes(searchValue)
    );
  }

  getUserInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  getAvatarColor(id: number): string {
    const colors = ['#11998e', '#38ef7d', '#f093fb', '#4facfe', '#fa709a'];
    return colors[id % colors.length];
  }
}
