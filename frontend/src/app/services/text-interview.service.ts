//frontend/src/app/services/text-interview.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';

export interface InterviewMessage {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface InterviewResponse {
  question?: string;
  followUp?: string;
  feedback?: string;
  summary?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TextInterviewService {
  private messagesSubject = new BehaviorSubject<InterviewMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private questions: { [key: string]: string[] } = {
    // ... (keep all your questions array as before)
    javascript: [
      "Explain the concept of closures in JavaScript with an example.",
      "What are promises and how do they differ from callbacks?",
      // ... rest of questions
    ],
    // ... other domains
  };

  private currentQuestionIndex = 0;
  private currentDomain = 'javascript';
  private totalQuestions = 5; // Default number of questions per interview

  constructor() {}

  // ADD THIS MISSING METHOD:
  setTotalQuestions(count: number): void {
    this.totalQuestions = count;
  }

  startInterview(domain: string): Observable<InterviewResponse> {
    this.clearMessages();
    this.currentQuestionIndex = 0;
    this.currentDomain = domain;

    const welcomeMessage = `Welcome to your ${this.getDomainName(domain)} text interview! I'll be asking you ${this.totalQuestions} questions. Let's begin!`;
    this.addMessage('ai', welcomeMessage);

    // Ask first question after a short delay
    setTimeout(() => {
      this.askNextQuestion();
    }, 1000);

    const firstQuestion = this.getCurrentQuestion();
    return of({ question: firstQuestion }).pipe(delay(500));
  }

  sendResponse(response: string): Observable<InterviewResponse> {
    this.addMessage('user', response);

    // Simulate AI processing
    return of(this.generateFeedback(response)).pipe(delay(1500));
  }

  endInterview(): Observable<InterviewResponse> {
    const summary = `Excellent! You've completed the ${this.getDomainName(this.currentDomain)} interview. You answered ${this.currentQuestionIndex} questions. Great job!`;
    this.addMessage('ai', summary);

    return of({ summary: summary }).pipe(delay(500));
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  addMessage(type: 'user' | 'ai', content: string): void {
    const messages = this.messagesSubject.value;
    const newMessage: InterviewMessage = {
      type,
      content,
      timestamp: new Date()
    };
    this.messagesSubject.next([...messages, newMessage]);
  }

  private askNextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions) {
      const question = this.getCurrentQuestion();
      this.addMessage('ai', question);
      this.currentQuestionIndex++;
    }
  }

  private getCurrentQuestion(): string {
    const domainQuestions = this.questions[this.currentDomain] || this.questions['javascript'];
    const questionIndex = this.currentQuestionIndex % domainQuestions.length;
    return domainQuestions[questionIndex];
  }

  private generateFeedback(response: string): InterviewResponse {
    const feedbacks = [
      "Good answer! You covered the main points well. To improve, you could also mention more specific examples.",
      "That's a solid response. For even better clarity, try structuring your answer with a clear beginning, middle, and end.",
      "You're on the right track. Consider adding more specific examples to strengthen your answer and demonstrate practical experience.",
      "Good understanding shown. You might want to elaborate more on the practical applications and real-world scenarios.",
      "Well explained! To make it more comprehensive, you could discuss alternative approaches or edge cases.",
    ];

    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    
    // Ask next question if we haven't reached the total
    if (this.currentQuestionIndex < this.totalQuestions) {
      const nextQuestion = this.getCurrentQuestion();
      setTimeout(() => {
        this.askNextQuestion();
      }, 2000);
      
      return { 
        feedback: randomFeedback,
        followUp: nextQuestion
      };
    } else {
      // End interview after all questions
      setTimeout(() => {
        this.endInterview().subscribe();
      }, 2000);
      
      return { feedback: randomFeedback };
    }
  }

  private getDomainName(domainId: string): string {
    const domainNames: { [key: string]: string } = {
      'javascript': 'JavaScript Fundamentals',
      'data-structures': 'Data Structures',
      'algorithms': 'Algorithms',
      'system-design': 'System Design',
      'behavioral': 'Behavioral Questions',
      'frontend': 'Frontend Development',
      'backend': 'Backend Development',
      'fullstack': 'Full Stack Development'
    };
    
    return domainNames[domainId] || 'Technical';
  }

  getCurrentProgress(): { current: number; total: number } {
    return {
      current: this.currentQuestionIndex,
      total: this.totalQuestions
    };
  }
}