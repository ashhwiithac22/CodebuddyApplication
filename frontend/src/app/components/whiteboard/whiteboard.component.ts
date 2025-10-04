//frontend/src/app/components/whiteboard/whiteboard.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { WhiteboardService } from '../../services/whiteboard.service';
import { WhiteboardQuestion } from '../../models/whiteboard-question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  standalone: false
})
export class WhiteboardComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;
  
  // Tools and colors
  currentTool: 'pen' | 'eraser' = 'pen';
  currentColor = '#000000';
  lineWidth = 3;
  
  colors: string[] = [
    '#000000', // Black
    '#dc2626', // Red
    '#2563eb', // Blue
    '#16a34a', // Green
    '#9333ea', // Purple
    '#ea580c', // Orange
    '#0891b2'  // Cyan
  ];
  
  lineWidths = [1, 2, 3, 5, 8];
  
  // Current question with default values
  currentQuestion: WhiteboardQuestion = {
    id: '1',
    title: 'Loading...',
    description: 'Please wait while we load your challenge.',
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
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }

  @HostListener('window:resize')
  onResize() {
    this.initializeCanvas();
  }
  
  private initializeCanvas() {
    if (!this.canvas?.nativeElement) {
      console.error('Canvas element not found - retrying...');
      setTimeout(() => this.initializeCanvas(), 100);
      return;
    }

    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    
    if (!this.ctx) {
      console.error('Could not get canvas context');
      return;
    }
    
    // Set canvas size
    const container = canvasEl.parentElement;
    if (container) {
      canvasEl.width = container.clientWidth;
      canvasEl.height = container.clientHeight;
    }
    
    // Set default styles
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    
    this.setupEventListeners();
    console.log('Canvas initialized successfully');
  }
  
  private setupEventListeners() {
    const canvasEl = this.canvas.nativeElement;
    
    // Remove existing listeners to avoid duplicates
    canvasEl.replaceWith(canvasEl.cloneNode(true));
    
    // Get the new reference after clone
    const newCanvas = document.querySelector('.drawing-canvas') as HTMLCanvasElement;
    
    // Mouse events
    newCanvas.addEventListener('mousedown', this.startDrawing.bind(this));
    newCanvas.addEventListener('mousemove', this.draw.bind(this));
    newCanvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    newCanvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    
    // Touch events for mobile
    newCanvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    newCanvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    newCanvas.addEventListener('touchend', this.stopDrawing.bind(this));
    
    // Update the canvas reference
    this.canvas.nativeElement = newCanvas;
  }
  
  private startDrawing(e: MouseEvent) {
    if (!this.ctx) return;
    
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }
  
  private draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    [this.lastX, this.lastY] = [currentX, currentY];
  }
  
  private stopDrawing() {
    this.isDrawing = false;
  }
  
  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    
    this.isDrawing = true;
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;
  }
  
  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx) return;
    
    const touch = e.touches[0];
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    [this.lastX, this.lastY] = [currentX, currentY];
  }
  
  // Tool methods
  selectTool(tool: 'pen' | 'eraser') {
    this.currentTool = tool;
    
    if (!this.ctx) {
      this.initializeCanvas();
      return;
    }
    
    if (tool === 'pen') {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.lineWidth;
    } else {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.strokeStyle = 'rgba(0,0,0,1)';
      this.ctx.lineWidth = 20; // Larger eraser
    }
  }
  
  selectColor(color: string) {
    this.currentColor = color;
    if (this.currentTool === 'pen' && this.ctx) {
      this.ctx.strokeStyle = color;
      this.ctx.globalCompositeOperation = 'source-over';
    }
  }
  
  setLineWidth(width: number) {
    this.lineWidth = width;
    if (this.ctx && this.currentTool === 'pen') {
      this.ctx.lineWidth = width;
    }
  }
  
  clearCanvas() {
    if (!this.ctx) {
      this.initializeCanvas();
      return;
    }
    
    const canvasEl = this.canvas.nativeElement;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
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
        // Fallback question
        this.currentQuestion = {
          id: '1',
          title: 'Reverse a Linked List',
          description: 'Write pseudocode or explain the logic to reverse a singly linked list. Draw the node connections and show how pointers change.',
          category: 'Data Structures',
          difficulty: 'medium',
          type: 'pseudocode',
          examples: [
            'Input: 1 -> 2 -> 3 -> 4 -> 5 -> NULL',
            'Output: 5 -> 4 -> 3 -> 2 -> 1 -> NULL'
          ],
          constraints: ['Do not modify node values', 'Use constant extra space']
        };
      }
    });
  }
  
  getDifficultyClass(difficulty: string): string {
    if (!difficulty) return 'difficulty-medium';
    
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-medium';
    }
  }
  
  nextQuestion() {
    this.loadDailyChallenge();
    setTimeout(() => {
      this.clearCanvas();
    }, 100);
  }
}