// frontend/src/app/components/layout/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string = '';
  isLoggedIn: boolean = false;
  menuOpen: boolean = false; // Add this property

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    
    // Get username from current user
    const currentUser = this.authService.getCurrentUser();
    this.username = currentUser?.username || '';
  }

  // Add these missing methods
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}