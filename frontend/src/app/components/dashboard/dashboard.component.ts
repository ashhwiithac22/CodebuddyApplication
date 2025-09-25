import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { TopicService } from '../../services/topic.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../layout/navbar.component';
import { DashboardNavComponent } from './dashboard-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent,DashboardNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProgress: any = {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    streak: 0,
    totalScore: 0
  };
  
  dailyChallenge: any = { 
    title: 'Two Sum', 
    difficulty: 'Easy',
    description: 'Find two numbers that add up to a target',
    completed: false 
  };
  
  topics: any[] = [];
  isLoading = true;
  username: string = '';

  constructor(
    private progressService: ProgressService,
    private topicService: TopicService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Get the actual username from the auth service
    this.username = this.getUsername();
    this.loadUserProgress();
    this.loadTopics();
  }

  // Get username from current user or return default
  getUsername(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.username || 'Coder';
  }

  loadUserProgress() {
    this.progressService.getUserProgress().subscribe({
      next: (data) => {
        this.userProgress = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading progress:', error);
        this.isLoading = false;
        // Start with zeros for new users
        this.userProgress = {
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          streak: 0,
          totalScore: 0
        };
      }
    });
  }

  loadTopics() {
    this.topicService.getTopics().subscribe({
      next: (data) => {
        this.topics = data.map((topic: any) => ({
          ...topic,
          solved: 0, // Start with 0 solved
          total: 10  // Assume 10 problems per topic
        }));
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        // Mock topics if API fails
        this.topics = [
          { name: 'Arrays', description: 'Learn about array manipulation', solved: 0, total: 10 },
          { name: 'Strings', description: 'String operations and algorithms', solved: 0, total: 8 },
          { name: 'Linked Lists', description: 'Working with linked data structures', solved: 0, total: 6 }
        ];
      }
    });
  }

  getProgressPercentage(solved: number, total: number): number {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  }

  getProgressColor(percentage: number): string {
    if (percentage === 0) return 'bg-secondary';
    if (percentage < 30) return 'bg-danger';
    if (percentage < 70) return 'bg-warning';
    return 'bg-success';
  }
}