import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { TimerService } from '../../services/timer.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // ← ADD
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../layout/navbar.component'; 

@Component({
  selector: 'app-coding-round',
  templateUrl: './coding-round.component.html',
  imports: [CommonModule, FormsModule, NavbarComponent],
  styleUrls: ['./coding-round.component.css']
})
export class CodingRoundComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  selectedQuestion: any;
  userCode: string = '';
  output: string = '';
  timeLeft: number = 3600; // 1 hour in seconds
  timerSubscription: Subscription;
  activeTab: string = 'problem';

  constructor(
    private questionService: QuestionService,
    private timerService: TimerService
  ) {
    this.timerSubscription = this.timerService.getTimer().subscribe(time => {
      this.timeLeft = time;
      if (time <= 0) {
        this.submitAll();
      }
    });
  }

  ngOnInit() {
    this.loadDailyQuestions();
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
    this.timerService.stopTimer();
  }

  loadDailyQuestions() {
    this.questionService.getDailyQuestions().subscribe(
      data => {
        this.questions = data;
        if (this.questions.length > 0) {
          this.selectQuestion(this.questions[0]);
        }
        this.timerService.startTimer(3600);
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }

  selectQuestion(question: any) {
    this.selectedQuestion = question;
    this.userCode = question.defaultCode || '';
    this.output = '';
    this.activeTab = 'problem';
  }

  runCode() {
    this.output = 'Running code...';
    // Simulate API call
    setTimeout(() => {
      this.output = '✓ All test cases passed!\n\nTest Case 1: Input: [2,7,11,15], 9 → Output: [0,1] ✓\nTest Case 2: Input: [3,2,4], 6 → Output: [1,2] ✓';
    }, 1000);
  }

  submitCode() {
    this.output = 'Submitting solution...';
    // Simulate API call
    setTimeout(() => {
      this.output = '✅ Solution accepted!\n\nCongratulations! You earned 10 points.';
    }, 1000);
  }

  submitAll() {
    alert('Time is up! Submitting all solutions...');
    // Logic to submit all solutions
  }

  formatTime(seconds: number): string {
    return this.timerService.getFormattedTime(seconds);
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  }
}