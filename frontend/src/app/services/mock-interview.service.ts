//frontend/src/app/services/mock-interview.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';

export interface InterviewMessage {
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
  audioUrl?: string;
}

export interface InterviewDomain {
  id: string;
  name: string;
  description: string;
  technicalSkills: string[];
  softSkills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VoiceInterviewService {
  private apiUrl = `${environment.apiUrl}/api/voice-interview`;
  private socket!: Socket;
  
  private messagesSubject = new BehaviorSubject<InterviewMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private audioRecordingSubject = new BehaviorSubject<boolean>(false);
  public audioRecording$ = this.audioRecordingSubject.asObservable();
  
  private aiSpeakingSubject = new BehaviorSubject<boolean>(false);
  public aiSpeaking$ = this.aiSpeakingSubject.asObservable();
  
  private currentSessionId: string | null = null;
  private recognition: any;
  private synthesis: SpeechSynthesis;

  // Available interview domains
  public interviewDomains: InterviewDomain[] = [
    {
      id: 'fullstack',
      name: 'Full Stack Development',
      description: 'Frontend, backend, databases, and system design',
      technicalSkills: ['JavaScript', 'React/Angular', 'Node.js', 'Databases', 'APIs'],
      softSkills: ['Problem-solving', 'Communication', 'Team collaboration', 'Project management']
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'User interfaces, responsive design, and web performance',
      technicalSkills: ['HTML/CSS', 'JavaScript', 'React/Angular/Vue', 'TypeScript', 'Web APIs'],
      softSkills: ['UI/UX understanding', 'Attention to detail', 'Creativity', 'User empathy']
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Server-side logic, databases, and API development',
      technicalSkills: ['Node.js/Python/Java', 'Databases', 'API Design', 'Authentication', 'Security'],
      softSkills: ['System thinking', 'Performance optimization', 'Security mindset', 'Scalability planning']
    },
    {
      id: 'datascience',
      name: 'Data Science & ML',
      description: 'Data analysis, machine learning, and statistical modeling',
      technicalSkills: ['Python', 'Pandas/Numpy', 'ML algorithms', 'Statistics', 'Data visualization'],
      softSkills: ['Analytical thinking', 'Business acumen', 'Storytelling with data', 'Research skills']
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      description: 'Infrastructure, deployment, and cloud technologies',
      technicalSkills: ['Docker/Kubernetes', 'AWS/Azure/GCP', 'CI/CD', 'Linux', 'Networking'],
      softSkills: ['Automation mindset', 'Reliability focus', 'Collaboration', 'Incident management']
    }
  ];

  constructor(private http: HttpClient) {
    this.synthesis = window.speechSynthesis;
    this.initializeSocket();
    this.initializeSpeechRecognition();
  }

  private initializeSocket(): void {
    this.socket = io(environment.apiUrl, {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to voice interview server');
    });

    this.socket.on('interview-message', (message: InterviewMessage) => {
      this.addMessage('ai', message.content);
      this.speakMessage(message.content);
    });

    this.socket.on('audio-response', (data: { audioUrl: string; text: string }) => {
      this.addMessage('ai', data.text, true, data.audioUrl);
      this.playAudio(data.audioUrl);
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  private initializeSpeechRecognition(): void {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.onSpeechResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.audioRecordingSubject.next(false);
      };

      this.recognition.onend = () => {
        this.audioRecordingSubject.next(false);
      };
    }
  }

  // Start a new voice interview
  startVoiceInterview(domain: string, difficulty: string = 'medium'): Observable<any> {
    this.clearMessages();
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/start`, { domain, difficulty }).subscribe({
        next: (response: any) => {
          this.currentSessionId = response.sessionId;
          this.socket.emit('join-interview', response.sessionId);
          
          // Add welcome message and speak it
          const welcomeMessage = `Welcome to your ${domain} interview! I'll be asking you technical and behavioral questions. Please speak your answers clearly.`;
          this.addMessage('ai', welcomeMessage);
          this.speakMessage(welcomeMessage);
          
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Start listening to user's voice
  startListening(): void {
    if (this.recognition) {
      this.recognition.start();
      this.audioRecordingSubject.next(true);
    } else {
      console.error('Speech recognition not supported');
    }
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.audioRecordingSubject.next(false);
    }
  }

  // Handle speech recognition result
  private onSpeechResult(transcript: string): void {
    this.addMessage('user', transcript, true);
    this.sendVoiceResponse(transcript);
  }

  // Send user's voice response to backend
  private sendVoiceResponse(transcript: string): void {
    if (!this.currentSessionId) return;

    this.socket.emit('voice-response', {
      sessionId: this.currentSessionId,
      transcript: transcript
    });
  }

  // Speak AI message using speech synthesis
  speakMessage(text: string): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }

    this.aiSpeakingSubject.next(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      this.aiSpeakingSubject.next(false);
    };

    utterance.onerror = () => {
      this.aiSpeakingSubject.next(false);
    };

    this.synthesis.speak(utterance);
  }

  // Play audio from URL
  private playAudio(audioUrl: string): void {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => console.error('Error playing audio:', error));
  }

  // End the interview
  endInterview(): Observable<any> {
    if (!this.currentSessionId) {
      throw new Error('No active interview session');
    }

    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }

    return this.http.post(`${this.apiUrl}/end`, { 
      sessionId: this.currentSessionId 
    });
  }

  // Add message to chat
  private addMessage(type: 'ai' | 'user', content: string, isAudio: boolean = false, audioUrl?: string): void {
    const newMessage: InterviewMessage = {
      type,
      content,
      timestamp: new Date(),
      isAudio,
      audioUrl
    };
    
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, newMessage]);
  }

  // Clear all messages
  clearMessages(): void {
    this.messagesSubject.next([]);
    this.currentSessionId = null;
  }

  // Get current session ID
  getCurrentSessionId(): string | null {
    return this.currentSessionId;
  }

  // Check if speech recognition is supported
  isSpeechRecognitionSupported(): boolean {
    return !!(window as any).webkitSpeechRecognition || !!(window as any).SpeechRecognition;
  }

  // Check if speech synthesis is supported
  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}