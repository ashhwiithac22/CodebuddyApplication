// frontend/src/app/components/voice-interview/voice-interview.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface InterviewMessage {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

@Component({
  selector: 'app-voice-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="interview-container">
      <div class="interview-content">
        <!-- Header -->
        <div class="interview-header">
          <h1>🎙️ Voice Technical Interview</h1>
          <p class="subtitle">Practice your technical interview skills</p>
        </div>

        <!-- Setup Section -->
        <div *ngIf="!isInterviewStarted" class="setup-section">
          <div class="difficulty-selection">
            <h2>Select Interview Difficulty</h2>
            
            <div class="difficulty-options">
              <label *ngFor="let level of ['easy', 'medium', 'hard']" class="difficulty-option">
                <input type="radio" 
                       [value]="level" 
                       [(ngModel)]="selectedDifficulty"
                       name="difficulty">
                <span class="difficulty-label" [class]="level">
                  {{ level | titlecase }}
                </span>
              </label>
            </div>

            <button class="start-button" (click)="startInterview()">
              <i class="fas fa-play-circle"></i>
              Start Voice Interview
            </button>
          </div>
        </div>

        <!-- Interview Section -->
        <div *ngIf="isInterviewStarted" class="interview-section">
          <div class="progress-section">
            <div class="progress-info">
              <span class="difficulty-badge" [class]="selectedDifficulty">
                {{ selectedDifficulty | titlecase }}
              </span>
              <span class="progress-text">
                Question {{ currentQuestion }} of 3
              </span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="(currentQuestion / 3) * 100"></div>
            </div>
          </div>

          <!-- Messages -->
          <div #messageContainer class="messages-container">
            <div *ngFor="let message of messages" 
                 class="message" 
                 [class.user-message]="message.type === 'user'"
                 [class.ai-message]="message.type === 'ai'">
              
              <div class="message-avatar">
                <i *ngIf="message.type === 'user'" class="fas fa-user"></i>
                <i *ngIf="message.type === 'ai'" class="fas fa-robot"></i>
              </div>
              
              <div class="message-content">
                <div class="message-header">
                  <span class="message-sender">
                    {{ message.type === 'user' ? 'You' : 'Interviewer' }}
                  </span>
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
                
                <div class="message-text">{{ message.content }}</div>
              </div>
            </div>

            <div *ngIf="isLoading" class="loading-message">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>AI is preparing the next question...</p>
            </div>
          </div>

          <!-- Controls -->
          <div class="voice-controls-section">
            <div class="voice-controls">
              <button class="voice-button" 
                      [class.recording]="isRecording"
                      (click)="toggleRecording()"
                      [disabled]="!canRecord()">
                <i class="fas" [class]="isRecording ? 'fa-stop-circle' : 'fa-microphone'"></i>
                {{ isRecording ? 'Stop Recording' : 'Start Speaking' }}
              </button>

              <div class="text-input-section" *ngIf="!isRecording && !isLoading">
                <div class="input-group">
                  <textarea 
                    #textInput
                    [(ngModel)]="textResponse"
                    placeholder="Type your answer here... (Press Enter to send)"
                    class="text-input"
                    (keydown)="onTextInputKeyPress($event)"
                    rows="3"></textarea>
                  <button 
                    class="send-text-btn" 
                    (click)="sendTextResponse()"
                    [disabled]="!textResponse.trim()">
                    <i class="fas fa-paper-plane"></i>
                    Send
                  </button>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="end-button" (click)="endInterview()">
                  <i class="fas fa-stop"></i>
                  End Interview
                </button>
                
                <button class="restart-button" (click)="restartInterview()">
                  <i class="fas fa-redo"></i>
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interview-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
    }

    .interview-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .interview-header {
      text-align: center;
      margin-bottom: 2rem;
      color: white;
    }

    .interview-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .setup-section {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .difficulty-selection h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .difficulty-options {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .difficulty-option input {
      display: none;
    }

    .difficulty-label {
      display: inline-block;
      padding: 1rem 2rem;
      border: 2px solid #e9ecef;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .difficulty-option input:checked + .difficulty-label {
      border-color: #667eea;
      background: #667eea;
      color: white;
    }

    .difficulty-label.easy {
      border-color: #28a745;
      color: #28a745;
    }

    .difficulty-option input:checked + .difficulty-label.easy {
      background: #28a745;
      color: white;
    }

    .difficulty-label.medium {
      border-color: #ffc107;
      color: #ffc107;
    }

    .difficulty-option input:checked + .difficulty-label.medium {
      background: #ffc107;
      color: #333;
    }

    .difficulty-label.hard {
      border-color: #dc3545;
      color: #dc3545;
    }

    .difficulty-option input:checked + .difficulty-label.hard {
      background: #dc3545;
      color: white;
    }

    .start-button {
      width: 100%;
      padding: 1.2rem 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 15px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .start-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }

    .interview-section {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .progress-section {
      margin-bottom: 2rem;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .difficulty-badge {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .difficulty-badge.easy { background: #28a745; color: white; }
    .difficulty-badge.medium { background: #ffc107; color: #333; }
    .difficulty-badge.hard { background: #dc3545; color: white; }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    .messages-container {
      height: 400px;
      overflow-y: auto;
      border: 1px solid #e9ecef;
      border-radius: 15px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      background: #f8f9fa;
    }

    .message {
      display: flex;
      margin-bottom: 1.5rem;
    }

    .user-message {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 1rem;
      flex-shrink: 0;
    }

    .user-message .message-avatar {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .ai-message .message-avatar {
      background: #28a745;
      color: white;
    }

    .message-content {
      max-width: 70%;
      background: white;
      border-radius: 18px;
      padding: 1rem 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .user-message .message-content {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .loading-message {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      color: #666;
    }

    .typing-indicator {
      display: flex;
      gap: 0.3rem;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: #667eea;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typing {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    .voice-controls-section {
      border-top: 1px solid #e9ecef;
      padding-top: 2rem;
    }

    .voice-button {
      padding: 1rem 2rem;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 1rem;
    }

    .voice-button.recording {
      background: #dc3545;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .text-input-section {
      margin: 1rem 0;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
    }

    .text-input {
      flex: 1;
      padding: 1rem;
      border: 2px solid #e9ecef;
      border-radius: 15px;
      font-size: 1rem;
      resize: vertical;
      min-height: 60px;
    }

    .send-text-btn {
      padding: 1rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .end-button, .restart-button {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .end-button {
      background: #dc3545;
      color: white;
    }

    .restart-button {
      background: #6c757d;
      color: white;
    }
  `]
})
export class VoiceInterviewComponent {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('textInput') private textInput!: ElementRef;

  selectedDifficulty: string = 'medium';
  isInterviewStarted: boolean = false;
  isInterviewEnded: boolean = false;
  isLoading: boolean = false;
  isRecording: boolean = false;
  currentQuestion: number = 1;
  
  textResponse: string = '';
  messages: InterviewMessage[] = [];

  // Question banks for each difficulty
  private questions = {
    easy: [
      "What is the difference between let, const, and var in JavaScript?",
      "Explain what a closure is in programming.",
      "What are the basic principles of object-oriented programming?"
    ],
    medium: [
      "How does the event loop work in JavaScript?",
      "Explain database indexing and its benefits.",
      "What are microservices and their advantages?"
    ],
    hard: [
      "How would you deep clone an object in JavaScript?",
      "Design a system for real-time collaborative editing.",
      "How would you handle system scalability for millions of users?"
    ]
  };

  startInterview(): void {
    this.isInterviewStarted = true;
    this.messages = [];
    this.currentQuestion = 1;
    
    // Add welcome message
    this.addMessage('ai', `Welcome to your ${this.selectedDifficulty} level technical interview! Let's begin with the first question.`);
    
    // Add first question after a delay
    setTimeout(() => {
      this.askQuestion();
    }, 1000);
  }

  private askQuestion(): void {
    const questions = this.questions[this.selectedDifficulty as keyof typeof this.questions] || this.questions.medium;
    const question = questions[this.currentQuestion - 1];
    
    if (question) {
      this.addMessage('ai', question);
    } else {
      this.endInterview();
    }
  }

  toggleRecording(): void {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording(): void {
    this.isRecording = true;
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      if (this.isRecording) {
        this.stopRecording();
        
        // Simulate speech recognition result
        const responses = {
          easy: "Let is block-scoped and can be reassigned, const is block-scoped but cannot be reassigned, and var is function-scoped and can be reassigned.",
          medium: "The event loop handles asynchronous operations by continuously checking the call stack and task queue.",
          hard: "I would use operational transforms for conflict resolution and WebSockets for real-time communication."
        };
        
        const response = responses[this.selectedDifficulty as keyof typeof responses] || responses.medium;
        this.processResponse(response, true);
      }
    }, 3000);
  }

  private stopRecording(): void {
    this.isRecording = false;
  }

  sendTextResponse(): void {
    const response = this.textResponse.trim();
    if (response) {
      this.processResponse(response, false);
      this.textResponse = '';
    }
  }

  onTextInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendTextResponse();
    }
  }

  private processResponse(response: string, isAudio: boolean): void {
    this.addMessage('user', response, isAudio);
    this.isLoading = true;

    // Simulate AI processing
    setTimeout(() => {
      this.isLoading = false;
      this.currentQuestion++;
      
      if (this.currentQuestion <= 3) {
        this.askQuestion();
      } else {
        this.endInterview();
      }
    }, 2000);
  }

  endInterview(): void {
    this.isInterviewEnded = true;
    this.addMessage('ai', `Great job! You've completed the ${this.selectedDifficulty} level interview. Your performance was excellent!`);
  }

  restartInterview(): void {
    this.isInterviewStarted = false;
    this.isInterviewEnded = false;
    this.isRecording = false;
    this.isLoading = false;
    this.currentQuestion = 1;
    this.textResponse = '';
    this.messages = [];
  }

  private addMessage(type: 'user' | 'ai', content: string, isAudio: boolean = false): void {
    this.messages.push({
      type,
      content,
      timestamp: new Date(),
      isAudio
    });
    
    // Scroll to bottom
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  canRecord(): boolean {
    return this.isInterviewStarted && !this.isInterviewEnded && !this.isLoading && !this.isRecording;
  }
}