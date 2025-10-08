// frontend/src/app/services/voice-interview.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, catchError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface InterviewMessage {
  type: 'user' | 'ai';
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
  question: string;
  feedback?: string;
  isCompleted?: boolean;
  requiresAnswer?: boolean;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
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

  // Interview state
  private currentDomain: string = 'javascript';
  private currentDifficulty: string = 'medium';
  private conversationHistory: OpenAIMessage[] = [];
  private recognition: any;
  private synthesis: SpeechSynthesis;
  private interviewStage: number = 0;
  private isRecognitionActive: boolean = false;

  public interviewDomains: InterviewDomain[] = [
    {
      id: 'javascript',
      name: 'JavaScript Fundamentals',
      description: 'Core JavaScript concepts, ES6+ features, and modern JS practices',
      technicalSkills: ['ES6+ Features', 'Async/Await', 'Closures', 'Prototypes'],
      softSkills: ['Problem Solving', 'Communication', 'Technical Explanation']
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      description: 'Fundamental data structures and their implementations',
      technicalSkills: ['Arrays/Lists', 'Trees/Graphs', 'Hash Tables', 'Big O Notation'],
      softSkills: ['Analytical Thinking', 'Optimization', 'Algorithm Design']
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      description: 'Algorithm design, analysis, and optimization techniques',
      technicalSkills: ['Sorting', 'Searching', 'DP', 'Recursion'],
      softSkills: ['Logical Reasoning', 'Pattern Recognition', 'Efficiency Analysis']
    },
    {
      id: 'system-design',
      name: 'System Design',
      description: 'Designing scalable and efficient software systems',
      technicalSkills: ['Architecture', 'Scalability', 'Databases', 'APIs'],
      softSkills: ['System Thinking', 'Trade-off Analysis', 'Communication']
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'Modern frontend technologies and frameworks',
      technicalSkills: ['React/Angular/Vue', 'CSS/HTML', 'State Management', 'Performance'],
      softSkills: ['UI/UX Understanding', 'Attention to Detail', 'User Focus']
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Server-side development and API design',
      technicalSkills: ['Node.js/Python/Java', 'Databases', 'APIs', 'Security'],
      softSkills: ['Architecture Planning', 'Security Mindset', 'Performance Optimization']
    }
  ];

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    try {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
      
      this.recognition.onstart = () => {
        console.log('🎤 Speech recognition started');
        this.isRecognitionActive = true;
        this.audioRecordingSubject.next(true);
      };
      
      this.recognition.onend = () => {
        console.log('🎤 Speech recognition ended');
        this.isRecognitionActive = false;
        this.audioRecordingSubject.next(false);
      };
      
      this.recognition.onresult = (event: any) => {
        console.log('🎤 Speech recognition result received');
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          if (transcript && transcript.trim()) {
            console.log('🎤 User said:', transcript);
            this.processUserResponse(transcript).subscribe();
          }
        }
      };
      
      this.recognition.onerror = (event: any) => {
        console.error('🎤 Speech recognition error:', event.error);
        this.isRecognitionActive = false;
        this.audioRecordingSubject.next(false);
        
        // Show user-friendly error messages
        if (event.error === 'not-allowed') {
          alert('❌ Microphone access denied. Please allow microphone permissions in your browser settings.');
        } else if (event.error === 'no-speech') {
          console.log('🎤 No speech detected - user might not have spoken');
        }
      };
      
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
    }
  }

  // Public methods
  isSpeechRecognitionSupported(): boolean {
    return 'webkitSpeechRecognition' in window;
  }

  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  startVoiceInterview(domain: string, difficulty: string): Observable<InterviewResponse> {
    this.clearMessages();
    this.currentDomain = domain;
    this.currentDifficulty = difficulty;
    this.interviewStage = 0;
    
    // Initialize conversation with system prompt
    const systemPrompt = this.generateSystemPrompt(domain, difficulty);
    this.conversationHistory = [
      {
        role: 'system',
        content: systemPrompt
      }
    ];

    const welcomeMessage = `Welcome to your ${this.getDomainName(domain)} interview at the ${difficulty} level! I'll be asking you ${this.getQuestionCount()} technical questions. Let's begin.`;
    this.addMessage('ai', welcomeMessage);
    this.speakMessage(welcomeMessage);

    // Generate first question
    return this.generateAIQuestion('Start the interview with an appropriate technical question.').pipe(
      tap((response: InterviewResponse) => {
        setTimeout(() => {
          this.addMessage('ai', response.question);
          this.speakMessage(response.question);
        }, 2000);
      })
    );
  }

  private generateSystemPrompt(domain: string, difficulty: string): string {
    const domainName = this.getDomainName(domain);
    const questionCount = this.getQuestionCount();
    
    return `You are a professional technical interviewer conducting a ${difficulty.toLowerCase()} level interview for ${domainName}.

INTERVIEW STRUCTURE:
- Conduct exactly ${questionCount} technical questions
- Ask one question at a time
- Wait for the candidate's complete answer before responding
- Provide brief, constructive feedback after each answer
- End the interview after ${questionCount} questions with personalized feedback

DOMAIN: ${domainName}
DIFFICULTY: ${difficulty}
QUESTIONS: ${questionCount}

DIFFICULTY GUIDELINES:
${this.getDifficultyGuidelines(difficulty)}

RESPONSE FORMAT: Return ONLY JSON in this exact format:
{
  "question": "The next question to ask",
  "feedback": "Brief feedback on previous answer (if any)",
  "isCompleted": false/true,
  "requiresAnswer": true/false
}

IMPORTANT: 
- Be professional but encouraging
- Ask practical, real-world questions
- Provide specific, actionable feedback
- Adapt question complexity based on candidate performance
- For the final response, set "isCompleted": true and provide summary feedback`;
  }

  private getDifficultyGuidelines(difficulty: string): string {
    const guidelines = {
      easy: `- Focus on fundamental concepts and definitions
- Ask straightforward, practical questions
- Expect basic implementation knowledge
- Provide encouraging feedback`,
      medium: `- Mix conceptual and practical questions
- Include scenario-based problems
- Expect understanding of trade-offs
- Provide constructive technical feedback`,
      hard: `- Ask complex, multi-part questions
- Include system design and optimization
- Expect deep technical knowledge
- Challenge with edge cases and scalability`
    };
    
    return guidelines[difficulty.toLowerCase() as keyof typeof guidelines] || guidelines.medium;
  }

  private getQuestionCount(): number {
    return 5;
  }

  private generateAIQuestion(userInput?: string): Observable<InterviewResponse> {
    if (userInput) {
      this.conversationHistory.push({
        role: 'user',
        content: userInput
      });
    }

    this.interviewStage++;

    const recentMessages = this.conversationHistory.slice(-10);

    // Use Gemini AI
    return this.callGeminiAI(recentMessages).pipe(
      switchMap((response: any) => {
        let aiResponse: string;
        
        // Extract response from Gemini format
        if (response.candidates && response.candidates[0]?.content?.parts[0]?.text) {
          aiResponse = response.candidates[0].content.parts[0].text;
        } else {
          throw new Error('No response from Gemini AI');
        }

        // Add AI response to conversation history
        this.conversationHistory.push({
          role: 'assistant',
          content: aiResponse
        });

        // Parse JSON response
        try {
          const parsedResponse: InterviewResponse = JSON.parse(aiResponse);
          return of(parsedResponse);
        } catch {
          // If not JSON, treat as a question
          return of({
            question: aiResponse,
            requiresAnswer: true,
            isCompleted: this.interviewStage >= this.getQuestionCount()
          });
        }
      }),
      catchError((error: any) => {
        console.error('Gemini API error:', error);
        // Fallback to enhanced mock questions
        return of(this.generateEnhancedMockQuestion());
      })
    );
  }

  private callGeminiAI(messages: OpenAIMessage[]): Observable<any> {
    const apiKey = environment.geminiApiKey;
    
    // If no API key or using placeholder, use mock responses
    if (!apiKey || apiKey === 'your-actual-gemini-api-key-here') {
      console.log('🔧 Using enhanced mock questions');
      return of({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify(this.generateEnhancedMockQuestion())
            }]
          }
        }]
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    // Convert to Gemini prompt format
    const prompt = this.convertToGeminiPrompt(messages);
    
    return new Observable(observer => {
      fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        console.error('Gemini API call failed:', error);
        // Fallback to mock responses
        observer.next({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify(this.generateEnhancedMockQuestion())
              }]
            }
          }]
        });
        observer.complete();
      });
    });
  }

  private convertToGeminiPrompt(messages: OpenAIMessage[]): string {
    let prompt = '';
    messages.forEach(msg => {
      if (msg.role === 'system') {
        prompt += `SYSTEM: ${msg.content}\n\n`;
      } else if (msg.role === 'user') {
        prompt += `USER: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant') {
        prompt += `ASSISTANT: ${msg.content}\n\n`;
      }
    });
    
    prompt += 'ASSISTANT: ';
    return prompt;
  }

  private generateEnhancedMockQuestion(): InterviewResponse {
    const userMessages = this.conversationHistory.filter(msg => msg.role === 'user').length;
    const isCompleted = userMessages >= this.getQuestionCount();

    if (isCompleted) {
      return {
        question: "🎉 Excellent! Interview completed successfully.",
        feedback: `You demonstrated strong ${this.currentDifficulty} level knowledge in ${this.getDomainName(this.currentDomain)}. Your answers showed good technical depth and practical understanding.`,
        isCompleted: true,
        requiresAnswer: false
      };
    }

    const questions = this.getSmartQuestions();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Provide feedback every 2nd question
    const shouldGiveFeedback = userMessages > 0 && userMessages % 2 === 0;

    if (shouldGiveFeedback) {
      const feedbacks = [
        "Good explanation! You covered the key points well.",
        "That's a solid approach. Consider mentioning more real-world examples.",
        "Well structured answer. You're thinking systematically about the problem.",
        "Good technical depth. Try to connect it to business impact.",
        "Clear communication. You explained complex concepts simply and effectively."
      ];
      
      const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];

      return {
        question: randomQuestion,
        feedback: randomFeedback,
        requiresAnswer: true,
        isCompleted: false
      };
    }

    return {
      question: randomQuestion,
      requiresAnswer: true,
      isCompleted: false
    };
  }

  private getSmartQuestions(): string[] {
    const questions = {
      javascript: {
        easy: [
          "What is the difference between let, const, and var in JavaScript?",
          "How do arrow functions differ from regular functions?",
          "What are template literals and why are they useful?",
          "Explain what destructuring assignment is.",
          "What is the spread operator and how is it used?"
        ],
        medium: [
          "How does the event loop work in JavaScript?",
          "What are closures and can you provide a practical example?",
          "Explain promise chaining and error handling with async/await.",
          "What is the difference between call, apply, and bind?",
          "How would you deep clone an object in JavaScript?"
        ],
        hard: [
          "Implement a debounce function from scratch.",
          "How does JavaScript handle memory management and garbage collection?",
          "Explain the module system in JavaScript (ES6 vs CommonJS).",
          "What are Web Workers and when would you use them?",
          "How would you implement a custom event emitter?"
        ]
      },
      'data-structures': {
        easy: [
          "What is the time complexity of array insertion and deletion?",
          "Explain the difference between arrays and linked lists.",
          "What is a stack and what are its common use cases?",
          "How does a queue work?",
          "What are the basic operations on a hash table?"
        ],
        medium: [
          "Implement a binary search tree insertion method.",
          "What are the different types of tree traversals?",
          "Explain how a min-heap works.",
          "What is the difference between BFS and DFS?",
          "How would you detect a cycle in a linked list?"
        ],
        hard: [
          "Design an LRU cache implementation.",
          "What are self-balancing trees and why are they important?",
          "Explain the A* search algorithm.",
          "How would you implement a trie data structure?",
          "What are the trade-offs between different sorting algorithms?"
        ]
      },
      'system-design': {
        easy: [
          "What are the main components of a web application?",
          "Explain the client-server architecture.",
          "What is a database and why is it important?",
          "What are APIs and how are they used?",
          "What is caching and why is it useful?"
        ],
        medium: [
          "How would you design a URL shortening service?",
          "What is load balancing and why is it important?",
          "Explain database indexing and its benefits.",
          "What are microservices and their advantages?",
          "How would you handle database migrations?"
        ],
        hard: [
          "Design a system for real-time collaborative editing.",
          "How would you architect a social media platform?",
          "Explain the CAP theorem and its implications.",
          "Design a recommendation system for an e-commerce platform.",
          "How would you handle system scalability for millions of users?"
        ]
      }
    };

    const domainData = (questions as any)[this.currentDomain] || questions.javascript;
    const difficultyData = domainData[this.currentDifficulty] || domainData.medium;
    
    return difficultyData.length > 0 ? difficultyData : [
      "Tell me about your experience with this technology.",
      "What challenges have you faced while working with this?",
      "How do you stay updated with the latest developments?",
      "What's your approach to learning new technologies?",
      "Can you describe a project where you used this technology?"
    ];
  }

  // Process both voice and text responses
  processUserResponse(userResponse: string, isAudio: boolean = false): Observable<InterviewResponse> {
    this.addMessage('user', userResponse, isAudio);
    
    return this.generateAIQuestion(userResponse).pipe(
      tap((aiResponse: InterviewResponse) => {
        if (aiResponse.feedback) {
          this.addMessage('ai', aiResponse.feedback!);
          this.speakMessage(aiResponse.feedback!);
          
          if (aiResponse.question && !aiResponse.isCompleted) {
            setTimeout(() => {
              this.addMessage('ai', aiResponse.question);
              this.speakMessage(aiResponse.question);
            }, 2000);
          }
        } else if (aiResponse.question) {
          this.addMessage('ai', aiResponse.question);
          this.speakMessage(aiResponse.question);
        }
      })
    );
  }

  // Voice recording methods
  startListening(): void {
    if (!this.recognition) {
      console.error('Speech recognition not initialized');
      alert('Speech recognition is not available in your browser. Please use Chrome or Edge.');
      return;
    }

    if (this.isRecognitionActive) {
      console.log('Speech recognition already active');
      return;
    }

    try {
      console.log('🎤 Starting speech recognition...');
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      alert('Error starting microphone. Please check your microphone permissions and try again.');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isRecognitionActive) {
      try {
        console.log('🎤 Stopping speech recognition...');
        this.recognition.stop();
        this.isRecognitionActive = false;
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }

  // Text input method
  sendTextResponse(textResponse: string): Observable<InterviewResponse> {
    if (!textResponse || textResponse.trim() === '') {
      console.log('Empty text response');
      return of();
    }
    
    console.log('📝 Sending text response:', textResponse);
    return this.processUserResponse(textResponse, false);
  }

  speakMessage(text: string): void {
    if (!this.isSpeechSynthesisSupported()) return;
    
    this.synthesis.cancel();
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

  stopSpeaking(): void {
    this.synthesis.cancel();
    this.aiSpeakingSubject.next(false);
  }

  endInterview(): Observable<InterviewResponse> {
    const summaryMessage = "Interview session ended. Thank you for your participation!";
    this.addMessage('ai', summaryMessage);
    this.speakMessage(summaryMessage);
    
    return of({
      question: summaryMessage,
      isCompleted: true,
      requiresAnswer: false
    });
  }

  addMessage(type: 'user' | 'ai', content: string, isAudio: boolean = false): void {
    const messages = this.messagesSubject.value;
    const newMessage: InterviewMessage = {
      type,
      content,
      timestamp: new Date(),
      isAudio
    };
    this.messagesSubject.next([...messages, newMessage]);
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
    this.conversationHistory = [];
    this.currentDomain = 'javascript';
    this.interviewStage = 0;
  }

  getDomainName(domainId: string): string {
    const domain = this.interviewDomains.find(d => d.id === domainId);
    return domain ? domain.name : 'Technical';
  }

  getCurrentProgress(): { current: number; total: number } {
    const userMessages = this.messagesSubject.value.filter(m => m.type === 'user').length;
    return {
      current: userMessages,
      total: this.getQuestionCount()
    };
  }

  // Check if voice recording is currently active
  isRecording(): boolean {
    return this.isRecognitionActive;
  }
}