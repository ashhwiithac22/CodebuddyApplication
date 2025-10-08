// frontend/src/app/components/voice-interview/voice-interview.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { VoiceInterviewService, InterviewMessage, InterviewDomain, InterviewResponse } from '../../services/voice-interview.service';

@Component({
  selector: 'app-voice-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './voice-interview.component.html',
  styleUrls: ['./voice-interview.component.css']
})
export class VoiceInterviewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('audioVisualizer') private audioVisualizer!: ElementRef;
  @ViewChild('textInput') private textInput!: ElementRef;

  // Component state
  selectedDomain: string = 'javascript';
  difficulty: string = 'medium';
  isInterviewStarted: boolean = false;
  isInterviewEnded: boolean = false;
  isLoading: boolean = false;
  isRecording: boolean = false;
  isAiSpeaking: boolean = false;
  isWaitingForAnswer: boolean = false;
  
  // Text input
  textResponse: string = '';

  // Data
  messages: InterviewMessage[] = [];
  domains: InterviewDomain[] = [];
  
  // Computed properties for template
  currentDomain: InterviewDomain | undefined;
  userMessagesCount: number = 0;
  
  // Make service public for template access
  constructor(public voiceInterviewService: VoiceInterviewService) {
    this.domains = this.voiceInterviewService.interviewDomains;
    this.updateCurrentDomain();
  }

  // Subscriptions
  private messagesSubscription!: Subscription;
  private recordingSubscription!: Subscription;
  private aiSpeakingSubscription!: Subscription;

  // Audio visualization
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animationId: number | null = null;

  ngOnInit(): void {
    // Subscribe to messages
    this.messagesSubscription = this.voiceInterviewService.messages$.subscribe(
      (messages: InterviewMessage[]) => {
        this.messages = messages;
        this.updateUserMessagesCount();
        this.scrollToBottom();
        
        // Auto-enable input when AI stops speaking and interview is active
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.type === 'ai' && !this.isAiSpeaking && this.isInterviewStarted && !this.isInterviewEnded) {
          setTimeout(() => {
            this.isWaitingForAnswer = true;
            // Focus on text input when ready for answer
            setTimeout(() => {
              if (this.textInput) {
                this.textInput.nativeElement.focus();
              }
            }, 100);
          }, 1000);
        }
      }
    );

    // Subscribe to recording state
    this.recordingSubscription = this.voiceInterviewService.audioRecording$.subscribe(
      (recording: boolean) => {
        this.isRecording = recording;
        if (recording) {
          this.startAudioVisualization();
        } else {
          this.stopAudioVisualization();
        }
      }
    );

    // Subscribe to AI speaking state
    this.aiSpeakingSubscription = this.voiceInterviewService.aiSpeaking$.subscribe(
      (speaking: boolean) => {
        this.isAiSpeaking = speaking;
        if (!speaking && this.isInterviewStarted && !this.isInterviewEnded) {
          // Enable input after a brief pause when AI finishes speaking
          setTimeout(() => {
            const lastMessage = this.messages[this.messages.length - 1];
            if (lastMessage?.type === 'ai') {
              this.isWaitingForAnswer = true;
            }
          }, 1500);
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.initializeAudioContext();
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
    this.cleanupAudio();
    this.voiceInterviewService.stopSpeaking();
    this.voiceInterviewService.stopListening();
  }

  // Update current domain when selection changes
  onDomainChange(): void {
    this.updateCurrentDomain();
  }

  private updateCurrentDomain(): void {
    this.currentDomain = this.domains.find(d => d.id === this.selectedDomain);
  }

  private updateUserMessagesCount(): void {
    this.userMessagesCount = this.messages.filter(m => m.type === 'user').length;
  }

  // Initialize Web Audio API for visualization
  private initializeAudioContext(): void {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Start voice interview
  startInterview(): void {
    if (!this.voiceInterviewService.isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    this.isInterviewStarted = true;
    this.isInterviewEnded = false;
    this.isLoading = true;
    this.isWaitingForAnswer = false;
    this.textResponse = '';

    this.voiceInterviewService.startVoiceInterview(this.selectedDomain, this.difficulty).subscribe({
      next: (response: InterviewResponse) => {
        this.isLoading = false;
        this.isWaitingForAnswer = response.requiresAnswer || false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error starting interview:', error);
        alert('Error starting interview. Please try again.');
      }
    });
  }

  // Start/stop voice recording
  toggleRecording(): void {
    if (this.isRecording) {
      console.log('Stopping recording...');
      this.voiceInterviewService.stopListening();
      this.isWaitingForAnswer = false;
    } else if (this.canRecord()) {
      console.log('Starting recording...');
      this.voiceInterviewService.startListening();
      this.isWaitingForAnswer = false;
      this.textResponse = ''; // Clear text input when starting voice
    } else {
      console.log('Cannot record now - conditions:', {
        isAiSpeaking: this.isAiSpeaking,
        isWaitingForAnswer: this.isWaitingForAnswer,
        isRecording: this.isRecording,
        isInterviewEnded: this.isInterviewEnded
      });
    }
  }

  // Send text response
  sendTextResponse(): void {
    const response = this.textResponse.trim();
    
    if (response) {
      this.isLoading = true;
      this.voiceInterviewService.sendTextResponse(response).subscribe({
        next: (aiResponse: InterviewResponse) => {
          this.isLoading = false;
          this.isWaitingForAnswer = aiResponse.requiresAnswer || false;
          if (aiResponse.isCompleted) {
            this.isInterviewEnded = true;
          }
          this.textResponse = ''; // Clear input after sending
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error sending text response:', error);
        }
      });
    }
  }

  // Handle Enter key in text input
  onTextInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendTextResponse();
    }
  }

  // End interview
  endInterview(): void {
    this.isInterviewEnded = true;
    this.isWaitingForAnswer = false;
    this.voiceInterviewService.endInterview().subscribe({
      next: (response: InterviewResponse) => {
        console.log('Interview ended successfully');
      },
      error: (error: any) => {
        console.error('Error ending interview:', error);
      }
    });
  }

  // Restart interview
  restartInterview(): void {
    this.voiceInterviewService.clearMessages();
    this.voiceInterviewService.stopSpeaking();
    this.voiceInterviewService.stopListening();
    this.isInterviewStarted = false;
    this.isInterviewEnded = false;
    this.isRecording = false;
    this.isAiSpeaking = false;
    this.isWaitingForAnswer = false;
    this.userMessagesCount = 0;
    this.textResponse = '';
  }

  // Audio visualization
  private startAudioVisualization(): void {
    if (!this.analyser || !this.audioVisualizer) return;

    const canvas = this.audioVisualizer.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      this.animationId = requestAnimationFrame(draw);

      if (!this.analyser) return;

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const hue = i * 360 / bufferLength;
        
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }

  private stopAudioVisualization(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    const canvas = this.audioVisualizer?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  // Helper methods
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

  private cleanupSubscriptions(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    if (this.recordingSubscription) {
      this.recordingSubscription.unsubscribe();
    }
    if (this.aiSpeakingSubscription) {
      this.aiSpeakingSubscription.unsubscribe();
    }
  }

  private cleanupAudio(): void {
    this.stopAudioVisualization();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  // Format time for display
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Get domain name by ID
  getDomainName(domainId: string): string {
    const domain = this.domains.find(d => d.id === domainId);
    return domain ? domain.name : 'Unknown Domain';
  }

  // Get technical skills for current domain
  getTechnicalSkills(): string[] {
    return this.currentDomain?.technicalSkills?.slice(0, 3) || [];
  }

  // Get soft skills for current domain
  getSoftSkills(): string[] {
    return this.currentDomain?.softSkills?.slice(0, 3) || [];
  }

  // Check if browser supports voice features
  isVoiceSupported(): boolean {
    return this.voiceInterviewService.isSpeechRecognitionSupported() && 
           this.voiceInterviewService.isSpeechSynthesisSupported();
  }

  // Get current question progress
  getProgressPercentage(): number {
    const progress = this.voiceInterviewService.getCurrentProgress();
    return Math.min((progress.current / progress.total) * 100, 100);
  }

  // Check if recording should be enabled
  canRecord(): boolean {
    return !this.isAiSpeaking && this.isWaitingForAnswer && !this.isRecording && !this.isInterviewEnded;
  }

  // Check if text input should be enabled
  canType(): boolean {
    return !this.isAiSpeaking && this.isWaitingForAnswer && !this.isRecording && !this.isInterviewEnded;
  }

  // Public method to get progress info for template
  getProgressInfo(): { current: number; total: number } {
    return this.voiceInterviewService.getCurrentProgress();
  }
}