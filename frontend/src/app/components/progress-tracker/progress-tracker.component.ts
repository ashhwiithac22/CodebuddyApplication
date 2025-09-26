//frontend/src/app/components/progress-tracker/progress-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../services/progress.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layout/navbar.component'; 


@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
    imports: [CommonModule, NavbarComponent], // Add PageNavComponent
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  userProgress: any;
  leaderboard: any[] = [];

  constructor(private progressService: ProgressService) { }

  ngOnInit() {
    this.loadUserProgress();
    this.loadLeaderboard();
  }

  loadUserProgress() {
    // Mock data - replace with actual API call
    this.userProgress = {
      totalSolved: 27,
      easySolved: 15,
      mediumSolved: 9,
      hardSolved: 3,
      streak: 12,
      totalScore: 420,
      dailyScores: [
        { date: '2023-05-01', score: 30 },
        { date: '2023-05-02', score: 45 },
        { date: '2023-05-03', score: 20 },
        { date: '2023-05-04', score: 60 },
        { date: '2023-05-05', score: 35 },
        { date: '2023-05-06', score: 50 },
        { date: '2023-05-07', score: 40 }
      ],
      recentActivities: [
        { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', time: '2 hours ago' },
        { type: 'solved', problem: 'Reverse String', difficulty: 'Easy', time: '4 hours ago' },
        { type: 'attempted', problem: 'Binary Tree Inorder', difficulty: 'Medium', time: '1 day ago' },
        { type: 'solved', problem: 'Valid Parentheses', difficulty: 'Easy', time: '1 day ago' }
      ]
    };
  }

  loadLeaderboard() {
    // Mock leaderboard data
    this.leaderboard = [
      { rank: 1, username: 'codeMaster', score: 850, solved: 68 },
      { rank: 2, username: 'algoNinja', score: 720, solved: 59 },
      { rank: 3, username: 'pythonPro', score: 680, solved: 54 },
      { rank: 4, username: 'yourUsername', score: 420, solved: 27 },
      { rank: 5, username: 'dataWizard', score: 380, solved: 25 }
    ];
  }

  getRankClass(rank: number): string {
    if (rank === 1) return 'table-warning';
    if (rank === 2) return 'table-light';
    if (rank === 3) return 'table-secondary';
    return '';
  }
}