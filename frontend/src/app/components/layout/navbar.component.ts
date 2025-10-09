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
    console.log('🚪 LOGOUT INITIATED - FORCE CLEARING ALL DATA');
    
    // 1. Close menu
    this.closeMenu();
    
    // 2. Aggressively clear ALL storage
    localStorage.clear();
    sessionStorage.clear();
    
    // 3. Clear service state
    this.authService.logout();
    
    // 4. Update local state
    this.updateAuthState();
    
    console.log('✅ All auth data cleared, redirecting to login...');
    
    // 5. FORCE redirect using window.location (bypass Angular router)
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  }
}