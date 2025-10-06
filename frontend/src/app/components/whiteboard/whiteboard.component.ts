//frontend/src/app/components/whiteboard/whiteboard.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { WhiteboardService } from '../../services/whiteboard.service';
import { WhiteboardQuestion } from '../../models/whiteboard-question.model';
import { RouterModule } from '@angular/router'; // Add this import
import { CommonModule } from '@angular/common'; // Add this import
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-whiteboard',
  standalone:true,
  imports: [CommonModule, RouterModule, NavbarComponent], // Add RouterModule here
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  // Tools configuration
  currentTool: 'pen' | 'eraser' = 'pen';
  currentColor = '#000000';
  currentBrushSize = 4;

  // Color options
  colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Violet', value: '#9333ea' },
    { name: 'Orange', value: '#ea580c' }
  ];

  // Brush sizes
  brushSizes = [2, 4, 6, 8, 12];

  // Current question
  currentQuestion: WhiteboardQuestion = {
    id: '1',
    title: 'Loading Challenge...',
    description: 'Please wait while we load your coding challenge.',
    category: 'General',
    difficulty: 'medium',
    type: 'pseudocode',
    examples: [],
    constraints: []
  };

  isLoading = true;

  constructor(private whiteboardService: WhiteboardService) {}

  ngOnInit() {
    this.loadDailyChallenge();
  }

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  private initializeCanvas() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    
    if (!this.ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Set initial styles
    this.setupCanvasStyle();
    this.setupEventListeners();
  }

  private setupCanvasStyle() {
    if (!this.ctx) return;

    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.currentBrushSize;
    this.ctx.strokeStyle = this.currentColor;
    
    // Clear canvas with white background
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private setupEventListeners() {
    const canvas = this.canvas.nativeElement;

    // Mouse events
    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

    // Touch events for mobile
    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  private startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    const canvas = this.canvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;

    // Start new path
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
    }
  }

  private draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;

    const canvas = this.canvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Draw line
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  private stopDrawing() {
    this.isDrawing = false;
    if (this.ctx) {
      this.ctx.closePath();
    }
  }

  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = this.canvas.nativeElement;
    const rect = canvas.getBoundingClientRect();

    this.isDrawing = true;
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
    }
  }

  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx) return;

    const touch = e.touches[0];
    const canvas = this.canvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  // Public methods for template
  selectTool(tool: 'pen' | 'eraser') {
    this.currentTool = tool;
    this.updateCanvasTool();
  }

  selectColor(color: string) {
    this.currentColor = color;
    this.currentTool = 'pen'; // Switch to pen when color selected
    this.updateCanvasTool();
  }

  setBrushSize(size: number) {
    this.currentBrushSize = size;
    this.updateCanvasTool();
  }

  private updateCanvasTool() {
    if (!this.ctx) return;

    if (this.currentTool === 'pen') {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.currentBrushSize;
    } else {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.strokeStyle = 'rgba(255,255,255,1)';
      this.ctx.lineWidth = this.currentBrushSize * 2; // Larger eraser
    }
  }

  clearCanvas() {
    if (!this.ctx) return;
    
    const canvas = this.canvas.nativeElement;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  loadDailyChallenge() {
    this.isLoading = true;
    this.whiteboardService.getDailyWhiteboardChallenge().subscribe({
      next: (question) => {
        this.currentQuestion = question;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading challenge:', error);
        this.isLoading = false;
      }
    });
  }

  nextQuestion() {
    this.loadDailyChallenge();
    this.clearCanvas();
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-medium';
    }
  }
}