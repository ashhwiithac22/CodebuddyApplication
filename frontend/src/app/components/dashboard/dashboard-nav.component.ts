//frontend/src/app/components/dashboard/dashboard-nav.component.ts
//frontend/src/app/components/dashboard/dashboard-nav.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="dashboard-nav">
      <div class="nav-container">
        <div class="nav-menu">
          <a class="nav-item learn-topics" routerLink="/topics" routerLinkActive="active">
            <div class="nav-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <span class="nav-text">Learn Topics</span>
            <div class="nav-hover-effect"></div>
          </a>
          
          <a class="nav-item take-interviews" routerLink="/voice-interview" routerLinkActive="active">
            <div class="nav-icon">
              <i class="fas fa-microphone"></i>
            </div>
            <span class="nav-text">Take Interviews</span>
            <div class="nav-hover-effect"></div>
          </a>
          
          <a class="nav-item whiteboard" routerLink="/whiteboard" routerLinkActive="active">
            <div class="nav-icon">
              <i class="fas fa-palette"></i>
            </div>
            <span class="nav-text">Whiteboard</span>
            <div class="nav-hover-effect"></div>
          </a>
          
          <a class="nav-item flashcards" routerLink="/flashcards" routerLinkActive="active">
            <div class="nav-icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <span class="nav-text">Flashcards</span>
            <div class="nav-hover-effect"></div>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .dashboard-nav {
      background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
      padding: 0;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(67, 97, 238, 0.3);
      border-bottom: 3px solid #4cc9f0;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .nav-menu {
      display: flex;
      gap: 0;
      justify-content: center;
    }

    .nav-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem 2rem;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
      border-bottom: 4px solid transparent;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      overflow: hidden;
      min-width: 200px;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      margin: 0 2px;
    }

    .nav-item:first-child {
      border-radius: 8px 0 0 8px;
    }

    .nav-item:last-child {
      border-radius: 0 8px 8px 0;
    }

    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .nav-item:hover::before {
      left: 100%;
    }

    .nav-item:hover {
      transform: translateY(-2px);
      color: white;
      background: rgba(255, 255, 255, 0.15);
      border-bottom-color: currentColor;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      z-index: 2;
    }

    /* Same light blue color for all menu items */
    .nav-item.learn-topics:hover {
      color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.2) 0%, rgba(67, 97, 238, 0.3) 100%);
      border-bottom-color: #4cc9f0;
    }

    .nav-item.take-interviews:hover {
      color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.2) 0%, rgba(67, 97, 238, 0.3) 100%);
      border-bottom-color: #4cc9f0;
    }

    .nav-item.whiteboard:hover {
      color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.2) 0%, rgba(67, 97, 238, 0.3) 100%);
      border-bottom-color: #4cc9f0;
    }

    .nav-item.flashcards:hover {
      color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.2) 0%, rgba(67, 97, 238, 0.3) 100%);
      border-bottom-color: #4cc9f0;
    }

    /* Active state styles with same light blue color */
    .nav-item.active {
      color: white;
      background: rgba(255, 255, 255, 0.25);
      border-bottom-color: white;
      box-shadow: inset 0 4px 15px rgba(255, 255, 255, 0.3);
      position: relative;
    }

    .nav-item.active::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: #4cc9f0;
    }

    .nav-item.active.learn-topics {
      border-bottom-color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.3) 0%, rgba(67, 97, 238, 0.4) 100%);
    }

    .nav-item.active.take-interviews {
      border-bottom-color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.3) 0%, rgba(67, 97, 238, 0.4) 100%);
    }

    .nav-item.active.whiteboard {
      border-bottom-color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.3) 0%, rgba(67, 97, 238, 0.4) 100%);
    }

    .nav-item.active.flashcards {
      border-bottom-color: #4cc9f0;
      background: linear-gradient(135deg, rgba(76, 201, 240, 0.3) 0%, rgba(67, 97, 238, 0.4) 100%);
    }

    .nav-icon {
      font-size: 1.3rem;
      width: 24px;
      text-align: center;
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.9);
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.2) rotate(5deg);
      color: currentColor;
    }

    .nav-item.active .nav-icon {
      transform: scale(1.1);
      color: white;
    }

    .nav-text {
      font-size: 1rem;
      white-space: nowrap;
      transition: all 0.3s ease;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .nav-item:hover .nav-text {
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .nav-hover-effect {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      transition: all 0.3s ease;
      transform: translateX(-50%);
      border-radius: 2px;
    }

    .nav-item:hover .nav-hover-effect {
      width: 80%;
    }

    /* Enhanced pulse animation for active items */
    @keyframes pulse-glow {
      0% { 
        box-shadow: 0 0 5px rgba(76, 201, 240, 0.3),
                    inset 0 0 10px rgba(255, 255, 255, 0.1);
      }
      50% { 
        box-shadow: 0 0 20px rgba(76, 201, 240, 0.6),
                    inset 0 0 15px rgba(255, 255, 255, 0.2);
      }
      100% { 
        box-shadow: 0 0 5px rgba(76, 201, 240, 0.3),
                    inset 0 0 10px rgba(255, 255, 255, 0.1);
      }
    }

    .nav-item.active {
      animation: pulse-glow 2s infinite;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .nav-item {
        padding: 1rem 1.5rem;
        min-width: 180px;
      }
      
      .nav-text {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 768px) {
      .dashboard-nav {
        margin-bottom: 1rem;
        border-bottom: 2px solid #4cc9f0;
      }
      
      .nav-menu {
        flex-direction: column;
        gap: 1px;
        padding: 0.5rem;
      }
      
      .nav-item {
        padding: 1rem 1.5rem;
        min-width: auto;
        justify-content: flex-start;
        border-bottom: 2px solid transparent;
        border-right: 4px solid transparent;
        border-radius: 8px;
        margin: 1px 0;
      }
      
      .nav-item:first-child {
        border-radius: 8px 8px 0 0;
      }

      .nav-item:last-child {
        border-radius: 0 0 8px 8px;
      }
      
      .nav-item:hover {
        border-right-color: currentColor;
        border-bottom-color: transparent;
        transform: translateX(4px);
      }
      
      .nav-item.active {
        border-right-color: currentColor;
        border-bottom-color: transparent;
      }
      
      .nav-hover-effect {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .nav-item {
        padding: 0.75rem 1rem;
      }
      
      .nav-text {
        font-size: 0.85rem;
      }
      
      .nav-icon {
        font-size: 1.1rem;
      }
    }
  `]
})
export class DashboardNavComponent {}