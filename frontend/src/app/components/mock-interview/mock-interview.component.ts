import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TextInterviewService, InterviewMessage, InterviewResponse } from '../../services/text-interview.service';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './mock-interview.component.html',
  styleUrls: ['./mock-interview.component.css']
})
export class MockInterviewComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  interviewTopics = [
    { id: 'javascript', name: 'JavaScript Fundamentals' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'system-design', name: 'System Design' },
    { id: 'behavioral', name: 'Behavioral Questions' },
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'fullstack', name: 'Full Stack Development' }
  ];

  selectedTopic = 'javascript';
  isInterviewStarted = false;
  isInterviewEnded = false;
  userInput = '';
  isLoading = false;
  messages: InterviewMessage[] = [];
  private messagesSubscription!: Subscription;

  // Progress tracking
  currentQuestion = 0;
  totalQuestions = 5;

  constructor(private textInterviewService: TextInterviewService) {}

  ngOnInit() {
    this.messagesSubscription = this.textInterviewService.messages$.subscribe(
      (messages: InterviewMessage[]) => {
        this.messages = messages;
        this.scrollToBottom();
        
        // Update progress based on AI messages (questions)
        this.currentQuestion = this.messages.filter(m => m.type === 'ai' && 
          !m.content.includes('Welcome') && !m.content.includes('Excellent')).length;
      }
    );
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  startInterview() {
    this.isInterviewStarted = true;
    this.isInterviewEnded = false;
    this.isLoading = true;
    
    // Set the number of questions for this interview
    this.textInterviewService.setTotalQuestions(this.totalQuestions);
    
    this.textInterviewService.startInterview(this.selectedTopic).subscribe({
      next: (response: InterviewResponse) => {
        this.isLoading = false;
        // The service automatically adds the first question
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error starting interview:', error);
        // Fallback message
        this.textInterviewService.addMessage('ai', "Welcome to your text-based mock interview! Let's begin with the first question.");
        this.textInterviewService.addMessage('ai', this.getFallbackQuestion());
      }
    });
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.userInput = '';
    this.isLoading = true;

    this.textInterviewService.sendResponse(userMessage).subscribe({
      next: (response: InterviewResponse) => {
        this.isLoading = false;
        // The service handles follow-up questions and feedback automatically
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error sending message:', error);
        // Fallback AI response
        setTimeout(() => {
          this.textInterviewService.addMessage('ai', "Thank you for your response. Let me ask you the next question...");
          this.textInterviewService.addMessage('ai', this.getFallbackQuestion());
        }, 1000);
      }
    });
  }

  endInterview() {
    this.isInterviewEnded = true;
    this.isLoading = true;
    
    this.textInterviewService.endInterview().subscribe({
      next: (response: InterviewResponse) => {
        this.isLoading = false;
        // Interview summary is handled by the service
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error ending interview:', error);
        // Fallback completion message
        this.textInterviewService.addMessage('ai', "Interview completed. Thank you for your participation!");
      }
    });
  }

  restartInterview() {
    this.textInterviewService.clearMessages();
    this.isInterviewStarted = false;
    this.isInterviewEnded = false;
    this.userInput = '';
    this.currentQuestion = 0;
    this.isLoading = false;
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.messageContainer) {
          this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  private getFallbackQuestion(): string {
    const fallbackQuestions = [
      "Can you tell me about your experience with this topic?",
      "What challenges have you faced while working with this technology?",
      "How would you explain this concept to someone who is new to it?",
      "What are the key benefits of using this approach?",
      "Can you provide an example from your personal experience?"
    ];
    
    return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
  }

  // Helper method to format message timestamps
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Helper methods for topic icons and names
  getTopicIcon(topicId: string): string {
    const icons: { [key: string]: string } = {
      'javascript': 'fa-js',
      'data-structures': 'fa-diagram-project',
      'algorithms': 'fa-code-branch',
      'system-design': 'fa-sitemap',
      'behavioral': 'fa-comments',
      'frontend': 'fa-palette',
      'backend': 'fa-server',
      'fullstack': 'fa-layer-group'
    };
    return icons[topicId] || 'fa-code';
  }

  getTopicName(topicId: string): string {
    const topic = this.interviewTopics.find(t => t.id === topicId);
    return topic ? topic.name : 'General';
  }

  // Progress tracking
  getProgressPercentage(): number {
    return this.totalQuestions > 0 ? (this.currentQuestion / this.totalQuestions) * 100 : 0;
  }

  // Update number of questions
  updateQuestionCount(count: number) {
    this.totalQuestions = count;
  }
}