import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VoiceInterviewService, InterviewMessage, InterviewDomain } from '../../services/voice-interview.service';

@Component({
  selector: 'app-voice-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-interview.component.html',
  styleUrls: ['./voice-interview.component.css']
})
export class VoiceInterviewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('audioVisualizer') private audioVisualizer!: ElementRef;

  // Component state
  selectedDomain: string = 'fullstack';
  difficulty: string = 'medium';
  isInterviewStarted: boolean = false;
  isInterviewEnded: boolean = false;
  isLoading: boolean = false;
  isRecording: boolean = false;
  isAiSpeaking: boolean = false;
  
  // Data
  messages: InterviewMessage[] = [];
  domains: InterviewDomain[] = [];
  
  // Computed properties for template
  currentDomain: InterviewDomain | undefined;
  userMessagesCount: number = 0;
  
  // Subscriptions
  private messagesSubscription!: Subscription;
  private recordingSubscription!: Subscription;
  private aiSpeakingSubscription!: Subscription;

  // Audio visualization - simplified approach
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animationId: number | null = null;

  constructor(private voiceInterviewService: VoiceInterviewService) {
    this.domains = this.voiceInterviewService.interviewDomains;
    this.updateCurrentDomain();
  }

  ngOnInit(): void {
    // Subscribe to messages
    this.messagesSubscription = this.voiceInterviewService.messages$.subscribe(
      messages => {
        this.messages = messages;
        this.updateUserMessagesCount();
        this.scrollToBottom();
      }
    );

    // Subscribe to recording state
    this.recordingSubscription = this.voiceInterviewService.audioRecording$.subscribe(
      recording => {
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
      speaking => {
        this.isAiSpeaking = speaking;
      }
    );
  }

  ngAfterViewInit(): void {
    this.initializeAudioContext();
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
    this.cleanupAudio();
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

  // Initialize Web Audio API for visualization - simplified
  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
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

    this.voiceInterviewService.startVoiceInterview(this.selectedDomain, this.difficulty).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Interview started successfully:', response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error starting interview:', error);
        alert('Error starting interview. Please try again.');
      }
    });
  }

  // Start/stop voice recording
  toggleRecording(): void {
    if (this.isRecording) {
      this.voiceInterviewService.stopListening();
    } else {
      this.voiceInterviewService.startListening();
    }
  }

  // End interview
  endInterview(): void {
    this.isInterviewEnded = true;
    this.voiceInterviewService.endInterview().subscribe({
      next: (response) => {
        const summary = response?.summary || "Thank you for participating in this voice interview!";
        this.voiceInterviewService.speakMessage(summary);
      },
      error: (error) => {
        console.error('Error ending interview:', error);
        this.voiceInterviewService.speakMessage("Interview completed. Thank you!");
      }
    });
  }

  // Restart interview
  restartInterview(): void {
    this.voiceInterviewService.clearMessages();
    this.isInterviewStarted = false;
    this.isInterviewEnded = false;
    this.isRecording = false;
    this.isAiSpeaking = false;
    this.userMessagesCount = 0;
  }

  // Audio visualization - simplified without Uint8Array type issues
  private startAudioVisualization(): void {
    if (!this.analyser || !this.audioVisualizer) return;

    const canvas = this.audioVisualizer.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = this.analyser.frequencyBinCount;

    const draw = () => {
      this.animationId = requestAnimationFrame(draw);

      if (!this.analyser) return;

      // Create the Uint8Array inline to avoid type issues
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const hue = i * 360 / bufferLength;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

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
}
