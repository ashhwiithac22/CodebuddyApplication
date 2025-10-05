// frontend/src/app/components/layout/navbar.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
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
  menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateAuthState();
    
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user?.username || '';
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.hamburger-menu') && !target.closest('.dropdown-menu')) {
      this.menuOpen = false;
    }
  }

  private updateAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    const currentUser = this.authService.getCurrentUser();
    this.username = currentUser?.username || '';
  }

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  logout(): void {
    console.log('🚪 Logout initiated');
    
    // Close menu first
    this.closeMenu();
    
    // Clear authentication
    this.authService.logout();
    
    // Update local state
    this.updateAuthState();
    
    console.log('🔄 Navigating to login...');
    
    // Use window.location for guaranteed redirect
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }
}