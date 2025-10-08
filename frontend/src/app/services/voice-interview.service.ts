// frontend/src/app/services/voice-interview.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface InterviewMessage {
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

export interface InterviewDomain {
  id: string;
  name: string;
  description: string;
  technicalSkills: string[];
  softSkills: string[];
}

export interface InterviewResponse {
  success: boolean;
  message?: string;
  question?: string;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoiceInterviewService {
  private messagesSubject = new BehaviorSubject<InterviewMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private audioRecordingSubject = new BehaviorSubject<boolean>(false);
  public audioRecording$ = this.audioRecordingSubject.asObservable();

  private aiSpeakingSubject = new BehaviorSubject<boolean>(false);
  public aiSpeaking$ = this.aiSpeakingSubject.asObservable();

  private speechRecognition: any = null;
  private speechSynthesis = window.speechSynthesis;
  private isListening = false;

  // Interview domains data
  public interviewDomains: InterviewDomain[] = [
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'Frontend development with modern JavaScript, ES6+, and browser APIs',
      technicalSkills: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Event Handling', 'Browser APIs'],
      softSkills: ['Problem Solving', 'Communication', 'Team Collaboration', 'Adaptability']
    },
    {
      id: 'angular',
      name: 'Angular',
      description: 'Modern Angular framework with TypeScript, components, and state management',
      technicalSkills: ['Components', 'Services', 'RxJS', 'Routing', 'Forms', 'State Management'],
      softSkills: ['Architecture Planning', 'Code Organization', 'Debugging', 'Performance Optimization']
    },
    {
      id: 'react',
      name: 'React',
      description: 'React library with hooks, context, and modern development patterns',
      technicalSkills: ['Hooks', 'Component Lifecycle', 'State Management', 'Context API', 'JSX'],
      softSkills: ['UI/UX Thinking', 'Component Design', 'State Management', 'Code Reusability']
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      description: 'Server-side JavaScript with Express, databases, and API development',
      technicalSkills: ['Express.js', 'REST APIs', 'Middleware', 'Database Integration', 'Authentication'],
      softSkills: ['Backend Architecture', 'API Design', 'Security Awareness', 'Scalability Planning']
    },
    {
      id: 'python',
      name: 'Python',
      description: 'Python programming with data structures, algorithms, and web frameworks',
      technicalSkills: ['Data Structures', 'Algorithms', 'Django/Flask', 'OOP', 'File Handling'],
      softSkills: ['Logical Thinking', 'Algorithm Design', 'Code Efficiency', 'Testing']
    },
    {
      id: 'java',
      name: 'Java',
      description: 'Java development with Spring Boot, OOP principles, and enterprise patterns',
      technicalSkills: ['OOP', 'Spring Boot', 'Collections', 'Multithreading', 'Design Patterns'],
      softSkills: ['Enterprise Thinking', 'Design Patterns', 'System Architecture', 'Code Maintainability']
    }
  ];

  constructor() {
    this.initializeSpeechRecognition();
  }

  /**
   * Initialize speech recognition if available
   */
  private initializeSpeechRecognition(): void {
    if (this.isSpeechRecognitionSupported()) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.speechRecognition = new SpeechRecognition();
      
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onstart = () => {
        this.audioRecordingSubject.next(true);
      };

      this.speechRecognition.onend = () => {
        this.audioRecordingSubject.next(false);
        this.isListening = false;
      };

      this.speechRecognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.audioRecordingSubject.next(false);
        this.isListening = false;
      };

      this.speechRecognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          this.addUserMessage(finalTranscript);
          this.processUserResponse(finalTranscript);
        }
      };
    }
  }

  /**
   * Check if speech recognition is supported
   */
  isSpeechRecognitionSupported(): boolean {
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
  }

  /**
   * Check if speech synthesis is supported
   */
  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  /**
   * Start voice interview
   */
  startVoiceInterview(domain: string, difficulty: string): Observable<InterviewResponse> {
    // Clear previous messages
    this.clearMessages();

    // Simulate API call delay
    return of({
      success: true,
      message: `Starting ${domain} interview at ${difficulty} level`
    }).pipe(
      delay(1000),
      tap(() => {
        // Add welcome message
        const welcomeMessage = this.generateWelcomeMessage(domain, difficulty);
        this.addAiMessage(welcomeMessage);
        
        // Speak the welcome message
        this.speakMessage(welcomeMessage);
        
        // Add first question after a delay
        setTimeout(() => {
          const firstQuestion = this.generateQuestion(domain, difficulty, 1);
          this.addAiMessage(firstQuestion);
          this.speakMessage(firstQuestion);
        }, 2000);
      })
    );
  }

  /**
   * End interview
   */
  endInterview(): Observable<InterviewResponse> {
    this.stopListening();
    this.stopSpeaking();

    const endMessage = "Thank you for completing the voice interview! Your responses have been recorded and you can review the conversation.";
    this.addAiMessage(endMessage);

    return of({
      success: true,
      message: 'Interview ended successfully'
    });
  }

  /**
   * Start listening to user speech
   */
  startListening(): void {
    if (this.speechRecognition && !this.isListening) {
      try {
        this.speechRecognition.start();
        this.isListening = true;
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }

  /**
   * Stop listening to user speech
   */
  stopListening(): void {
    if (this.speechRecognition && this.isListening) {
      try {
        this.speechRecognition.stop();
        this.isListening = false;
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }

  /**
   * Speak a message using speech synthesis
   */
  speakMessage(message: string): void {
    if (!this.isSpeechSynthesisSupported()) {
      console.warn('Speech synthesis not supported');
      return;
    }

    this.stopSpeaking();
    this.aiSpeakingSubject.next(true);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      this.aiSpeakingSubject.next(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.aiSpeakingSubject.next(false);
    };

    this.speechSynthesis.speak(utterance);
  }

  /**
   * Stop speaking
   */
  stopSpeaking(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
      this.aiSpeakingSubject.next(false);
    }
  }

  /**
   * Process user response and generate AI reply
   */
  private processUserResponse(userMessage: string): void {
    // Simulate AI thinking delay
    setTimeout(() => {
      const currentDomain = this.interviewDomains.find(d => d.id === 'javascript'); // Default domain for demo
      const questionCount = this.messagesSubject.value.filter(m => m.type === 'ai').length;
      
      if (questionCount < 5) {
        // Generate next question
        const nextQuestion = this.generateQuestion(currentDomain?.id || 'javascript', 'medium', questionCount + 1);
        this.addAiMessage(nextQuestion);
        this.speakMessage(nextQuestion);
      } else {
        // End of interview
        const feedback = this.generateFeedback(userMessage);
        this.addAiMessage(feedback);
        this.speakMessage(feedback);
      }
    }, 2000);
  }

  /**
   * Generate welcome message
   */
  private generateWelcomeMessage(domain: string, difficulty: string): string {
    const domainName = this.interviewDomains.find(d => d.id === domain)?.name || domain;
    return `Welcome to your ${domainName} voice interview at the ${difficulty} level. I'll be asking you ${difficulty === 'easy' ? '3' : difficulty === 'medium' ? '5' : '7'} questions to assess your knowledge. Please speak your answers clearly. Let's begin with your first question.`;
  }

  /**
   * Generate interview question based on domain and difficulty
   */
  private generateQuestion(domain: string, difficulty: string, questionNumber: number): string {
    const questions: { [key: string]: { [key: string]: string[] } } = {
      javascript: {
        easy: [
          "What is the difference between let, const, and var in JavaScript?",
          "Can you explain what a closure is in JavaScript?",
          "How does event delegation work in JavaScript?",
          "What is the difference between == and === operators?",
          "How do you handle asynchronous operations in JavaScript?"
        ],
        medium: [
          "Explain the concept of prototypal inheritance in JavaScript.",
          "What are promises and how do they differ from callbacks?",
          "How does the 'this' keyword work in different contexts?",
          "What are arrow functions and how do they differ from regular functions?",
          "Explain the event loop and how it handles asynchronous code."
        ],
        hard: [
          "Explain the microtask and macrotask queues in the event loop.",
          "How does JavaScript handle memory management and garbage collection?",
          "What are Web Workers and when would you use them?",
          "Explain the Module Pattern and its variations in JavaScript.",
          "How would you implement a debounce function from scratch?"
        ]
      },
      angular: {
        easy: [
          "What are the main building blocks of an Angular application?",
          "What is the difference between components and directives?",
          "How do you handle data binding in Angular?",
          "What is dependency injection in Angular?",
          "How do you create and use services in Angular?"
        ],
        medium: [
          "Explain the component lifecycle hooks in Angular.",
          "What is the difference between reactive and template-driven forms?",
          "How does change detection work in Angular?",
          "What are observables and how are they used in Angular?",
          "Explain the concept of lazy loading in Angular routing."
        ],
        hard: [
          "How would you optimize the performance of an Angular application?",
          "Explain the difference between pure and impure pipes.",
          "How do you implement route guards for authentication?",
          "What is the Ivy renderer and what improvements does it bring?",
          "How would you handle state management in a large Angular application?"
        ]
      },
      // Add questions for other domains...
    };

    const domainQuestions = questions[domain] || questions['javascript'];
    const difficultyQuestions = domainQuestions[difficulty] || domainQuestions['medium'];
    const questionIndex = (questionNumber - 1) % difficultyQuestions.length;
    
    return `Question ${questionNumber}: ${difficultyQuestions[questionIndex]}`;
  }

  /**
   * Generate feedback for user response
   */
  private generateFeedback(userMessage: string): string {
    return `Thank you for your answer. That was the final question in this interview. You've demonstrated good understanding of the concepts. Practice areas to focus on: deepening your knowledge of advanced patterns and real-world implementation scenarios. Great job overall!`;
  }

  /**
   * Add AI message to the conversation
   */
  private addAiMessage(content: string): void {
    const message: InterviewMessage = {
      type: 'ai',
      content: content,
      timestamp: new Date(),
      isAudio: true
    };
    
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  /**
   * Add user message to the conversation
   */
  private addUserMessage(content: string): void {
    const message: InterviewMessage = {
      type: 'user',
      content: content,
      timestamp: new Date(),
      isAudio: true
    };
    
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  /**
   * Clear all messages
   */
  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  /**
   * Get current messages
   */
  getMessages(): InterviewMessage[] {
    return this.messagesSubject.value;
  }

  /**
   * Check if currently recording audio
   */
  isRecordingAudio(): boolean {
    return this.audioRecordingSubject.value;
  }

  /**
   * Check if AI is currently speaking
   */
  isAiSpeaking(): boolean {
    return this.aiSpeakingSubject.value;
  }
}