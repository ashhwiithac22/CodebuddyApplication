//frontend/src/app/components/topics/topic-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService, Topic, Question, TestResult } from '../../services/topic.service';
import { UserService } from '../../services/user.service';  
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-topic-test',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './topic-test.component.html',
  styleUrls: ['./topic-test.component.css']
})
export class TopicTestComponent implements OnInit {
  // All properties that are referenced in the template
  topic: Topic | null = null;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  totalQuestions: number = 25;
  score: number = 0;
  totalScore: number = 0;
  testCompleted: boolean = false;
  isLoading: boolean = true;
  topicId: string = '';

  // Make String available in template
  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.topicId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTopicAndQuestions();
  }

  loadTopicAndQuestions() {
    // Create mock data for immediate testing
    this.createMockTopic();
    this.generateQuestions();
    this.isLoading = false;
  }

  createMockTopic() {
    this.topic = {
      id: this.topicId, // Now string type
      name: 'Data Structures',
      description: 'Test your knowledge of data structures',
      category: 'DSA',
      commonProblems: [],
      hints: []
    };
  }

  generateQuestions() {
    this.questions = [];
    
    for (let i = 1; i <= this.totalQuestions; i++) {
      if (i % 2 === 0) {
        this.questions.push(this.generateMCQQuestion(i));
      } else {
        this.questions.push(this.generateFillBlankQuestion(i));
      }
    }
  }

  generateMCQQuestion(id: number): any {
    const templates = [
      {
        question: `Which approach will you use for ${this.topic?.name} when dealing with large datasets?`,
        options: ['Brute Force', 'Divide and Conquer', 'Greedy Method', 'Dynamic Programming'],
        correctAnswer: 'Divide and Conquer'
      }
    ];

    const template = templates[0];
    
    return {
      id: id,
      type: 'mcq',
      question: template.question,
      options: template.options,
      correctAnswer: template.correctAnswer,
      isAnswered: false,
      points: 2
    };
  }

  generateFillBlankQuestion(id: number): any {
    const templates = [
      {
        question: `The key operation in ${this.topic?.name} is __________.`,
        correctAnswer: 'searching'
      }
    ];

    const template = templates[0];
    
    return {
      id: id,
      type: 'fillblank',
      question: template.question,
      correctAnswer: template.correctAnswer,
      isAnswered: false,
      points: 2
    };
  }

  selectAnswer(questionIndex: number, answer: string) {
    if (this.testCompleted) return;

    const question = this.questions[questionIndex];
    if (question.isAnswered) return;

    question.userAnswer = answer;
    question.isAnswered = true;

    if (answer === question.correctAnswer) {
      question.isCorrect = true;
      this.score += question.points;
    } else {
      question.isCorrect = false;
    }

    setTimeout(() => {
      if (questionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.completeTest();
      }
    }, 1000);
  }

  submitFillBlankAnswer(inputElement: HTMLInputElement) {
    const answer = inputElement.value.trim();
    if (answer) {
      this.selectAnswer(this.currentQuestionIndex, answer);
      inputElement.value = '';
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.completeTest();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  completeTest() {
    this.testCompleted = true;
    this.totalScore = this.score;
    this.saveTestResults();
  }

  saveTestResults() {
    console.log('Test completed. Score:', this.totalScore);
  }

  retryTest() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalScore = 0;
    this.testCompleted = false;
    this.generateQuestions();
  }

  backToTopics() {
    this.router.navigate(['/topics']);
  }

  getProgressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
  }

  getCurrentQuestion(): any {
    return this.questions[this.currentQuestionIndex];
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  getCorrectAnswersCount(): number {
    return this.questions.filter((q: any) => q.isCorrect).length;
  }

  getAccuracy(): string {
    const accuracy = (this.getCorrectAnswersCount() / this.totalQuestions) * 100;
    return accuracy.toFixed(1);
  }
}