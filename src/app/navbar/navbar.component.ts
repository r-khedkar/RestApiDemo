import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SafeUser } from '../models/user.model';

/**
 * Navigation bar component with user menu and authentication controls
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: SafeUser | null = null;
  isMenuCollapsed = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getSafeCurrentUser();
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  /**
   * Handle user logout
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
