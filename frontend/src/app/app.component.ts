// frontend/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CodeBuddy';
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Clear any mock data on app start
    this.clearMockData();
    
    // Set up router event listener
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
        
        // Handle root path redirect
        if (event.url === '/' || event.url === '') {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
          return;
        }
        
        // FIX: Don't redirect if user is on login page (even if logged in)
        // This allows logout to work properly
        if ((event.url === '/login' || event.url === '/register') && this.authService.isLoggedIn()) {
          console.log('User is logged in but on auth page - allowing access for logout flow');
          return; // Don't redirect - let the user stay on login page
        }
        
        // PREVENT accessing protected routes without authentication
        const protectedRoutes = ['/dashboard', '/topics', '/voice-interview', '/whiteboard', '/flashcards'];
        const isProtectedRoute = protectedRoutes.some(route => event.url.startsWith(route));
        
        if (isProtectedRoute && !this.authService.isLoggedIn()) {
          console.log('Unauthorized access attempt. Redirecting to login...');
          this.router.navigate(['/login']);
        }
        
        // FIX: REMOVED the auto-redirect to dashboard for logged-in users
        // This was causing the logout issue
      }
    });
  }

  // Clear any mock authentication data
  private clearMockData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user && user.token && user.token.includes('mock-jwt-token-')) {
      localStorage.removeItem('currentUser');
      console.log('🧹 Cleared mock authentication data');
    }
  }
}