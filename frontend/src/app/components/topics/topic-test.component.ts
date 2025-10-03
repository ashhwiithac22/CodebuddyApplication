// frontend/src/app/components/topics/topic-test.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService, Topic } from '../../services/topic.service';
import { TestService, Question, TestResult, TestProgress } from '../../services/test.service';
import { NavbarComponent } from '../layout/navbar.component';

// Extended interface for test questions
interface TestQuestion extends Question {
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean;
  points: number;
}

@Component({
  selector: 'app-topic-test',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './topic-test.component.html',
  styleUrls: ['./topic-test.component.css']
})
export class TopicTestComponent implements OnInit {
  topic: Topic | null = null;
  questions: TestQuestion[] = [];
  currentQuestionIndex: number = 0;
  totalQuestions: number = 25;
  score: number = 0;
  totalScore: number = 0;
  testCompleted: boolean = false;
  isLoading: boolean = true;
  topicId: string = '';
  startTime: Date = new Date();
  endTime: Date = new Date();
  answeredQuestions: number = 0;

  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService,
    @Inject(TestService) private testService: TestService
  ) {}

  ngOnInit() {
    this.topicId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTopicAndQuestions();
  }

  loadTopicAndQuestions() {
    this.isLoading = true;
    
    this.topicService.getTopicById(this.topicId).subscribe(
      (topic: Topic | undefined) => {
        if (topic) {
          this.topic = topic;
        } else {
          this.createMockTopic();
        }
        
        this.testService.getTopicQuestions(this.topicId).subscribe(
          (questions: Question[]) => {
            this.questions = questions.map((q, index) => ({
              ...q,
              userAnswer: '',
              isAnswered: false,
              isCorrect: false,
              points: q.points || 2
            } as TestQuestion));
            this.isLoading = false;
            this.startTime = new Date();
            this.checkSavedProgress();
          },
          (error: any) => {
            console.error('Error loading questions:', error);
            this.generateMockQuestions();
            this.isLoading = false;
            this.startTime = new Date();
          }
        );
      },
      (error: any) => {
        console.error('Error loading topic:', error);
        this.createMockTopic();
        this.generateMockQuestions();
        this.isLoading = false;
        this.startTime = new Date();
      }
    );
  }

  checkSavedProgress() {
    const progress = this.testService.getTestProgress();
    if (progress && progress.topicId === this.topicId) {
      this.currentQuestionIndex = progress.currentQuestionIndex;
      this.score = progress.score;
      this.answeredQuestions = progress.answeredQuestions;
      this.startTime = new Date(progress.startTime);
      console.log('Resumed test from saved progress');
    }
  }

  saveProgress() {
    const progress: TestProgress = {
      topicId: this.topicId,
      currentQuestionIndex: this.currentQuestionIndex,
      score: this.score,
      answeredQuestions: this.answeredQuestions,
      startTime: this.startTime
    };
    this.testService.saveTestProgress(progress);
  }

  createMockTopic() {
    const topicNames: { [key: string]: string } = {
      '1': 'Arrays & Lists', '2': 'HashSets', '3': 'HashMaps & Dictionaries',
      '4': 'Strings', '5': 'Linked Lists', '6': 'Stacks', '7': 'Queues',
      '8': 'Trees', '9': 'Graphs', '10': 'Heaps', '11': 'Sorting Algorithms',
      '12': 'Searching Algorithms', '13': 'Dynamic Programming',
      '14': 'Greedy Algorithms', '15': 'Backtracking'
    };
    
    this.topic = {
      id: this.topicId,
      name: topicNames[this.topicId] || 'Data Structures',
      description: 'Test your knowledge with 25 challenging questions',
      category: 'DSA',
      commonProblems: [],
      hints: []
    };
  }

  generateMockQuestions() {
    this.questions = [];
    for (let i = 1; i <= this.totalQuestions; i++) {
      if (i % 2 === 0) {
        this.questions.push({
          id: i,
          type: 'mcq',
          question: `Which approach is most efficient for ${this.topic?.name} problem ${i}?`,
          options: ['Brute Force', 'Optimized Algorithm', 'Heuristic', 'Randomized'],
          correctAnswer: 'Optimized Algorithm',
          userAnswer: '',
          isAnswered: false,
          isCorrect: false,
          points: 2
        } as TestQuestion);
      } else {
        this.questions.push({
          id: i,
          type: 'fillblank',
          question: `The key operation in ${this.topic?.name} for problem ${i} is __________.`,
          correctAnswer: 'optimization',
          userAnswer: '',
          isAnswered: false,
          isCorrect: false,
          points: 2
        } as TestQuestion);
      }
    }
  }

  selectAnswer(questionIndex: number, answer: string) {
    if (this.testCompleted) return;

    const question = this.questions[questionIndex];
    if (question.isAnswered) return;

    question.userAnswer = answer;
    question.isAnswered = true;
    this.answeredQuestions++;

    if (answer === question.correctAnswer) {
      question.isCorrect = true;
      this.score += question.points || 2;
    } else {
      question.isCorrect = false;
    }

    this.saveProgress();

    setTimeout(() => {
      if (questionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.saveProgress();
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
      this.saveProgress();
    } else {
      this.completeTest();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.saveProgress();
    }
  }

  completeTest() {
    this.testCompleted = true;
    this.endTime = new Date();
    this.totalScore = this.score;
    this.testService.clearTestProgress();
    this.saveTestResults();
  }

  saveTestResults() {
    const timeSpent = this.testService.calculateTimeSpent(this.startTime, this.endTime);
    
    const testResult: TestResult = {
      topicId: this.topicId,
      topicName: this.topic?.name || 'Unknown Topic',
      score: this.totalScore,
      totalQuestions: this.totalQuestions,
      correctAnswers: this.getCorrectAnswersCount(),
      completedAt: new Date(),
      questions: this.questions,
      timeSpent: timeSpent
    };

    this.testService.saveTestResult(testResult).subscribe(
      (response: { success: boolean; message: string }) => {
        console.log('Test results saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving test results:', error);
      }
    );
  }

  retryTest() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalScore = 0;
    this.testCompleted = false;
    this.answeredQuestions = 0;
    this.startTime = new Date();
    this.testService.clearTestProgress();
    this.loadTopicAndQuestions();
  }

  backToTopics() {
    this.testService.clearTestProgress();
    this.router.navigate(['/topics']);
  }

  getProgressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
  }

  getCurrentQuestion(): TestQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  getCorrectAnswersCount(): number {
    return this.questions.filter(q => q.isCorrect).length;
  }

  getAccuracy(): string {
    const accuracy = (this.getCorrectAnswersCount() / this.totalQuestions) * 100;
    return accuracy.toFixed(1);
  }

  getTimeSpent(): string {
    return this.testService.calculateTimeSpent(this.startTime, this.endTime);
  }

  isToughQuestion(): boolean {
    return this.currentQuestionIndex < 3;
  }

  getAnsweredCount(): number {
    return this.questions.filter(q => q.isAnswered).length;
  }
}