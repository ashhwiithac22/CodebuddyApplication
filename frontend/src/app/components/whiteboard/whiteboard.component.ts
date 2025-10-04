//frontend/src/app/components/whiteboard/whiteboard.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { WhiteboardService } from '../../services/whiteboard.service';
import { WhiteboardQuestion } from '../../models/whiteboard-question.model';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
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
  showTips = true;

  constructor(private whiteboardService: WhiteboardService) {}
  
  ngOnInit() {
    this.loadDailyChallenge();
  }
  
  ngAfterViewInit() {
    this.initializeCanvas();
  }

  @HostListener('window:resize')
  onResize() {
    this.initializeCanvas();
  }
  
  private initializeCanvas() {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    
    if (!this.ctx) {
      console.error('Could not get canvas context');
      return;
    }
    
    // Set canvas size to match container
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
  }
  
  private setupEventListeners() {
    const canvasEl = this.canvas.nativeElement;
    
    // Mouse events
    canvasEl.addEventListener('mousedown', this.startDrawing.bind(this));
    canvasEl.addEventListener('mousemove', this.draw.bind(this));
    canvasEl.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvasEl.addEventListener('mouseout', this.stopDrawing.bind(this));
    
    // Touch events for mobile
    canvasEl.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    canvasEl.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    canvasEl.addEventListener('touchend', this.stopDrawing.bind(this));
  }
  
  private startDrawing(e: MouseEvent) {
    if (!this.ctx) return;
    
    this.isDrawing = true;
    this.draw(e); // Start drawing immediately
  }
  
  private draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const scaleX = canvasEl.width / rect.width;
    const scaleY = canvasEl.height / rect.height;
    
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }
  
  private stopDrawing() {
    this.isDrawing = false;
    // Reset last coordinates
    this.lastX = 0;
    this.lastY = 0;
  }
  
  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    if (!this.ctx) return;
    
    const touch = e.touches[0];
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const scaleX = canvasEl.width / rect.width;
    const scaleY = canvasEl.height / rect.height;
    
    this.isDrawing = true;
    this.lastX = (touch.clientX - rect.left) * scaleX;
    this.lastY = (touch.clientY - rect.top) * scaleY;
  }
  
  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx) return;
    
    const touch = e.touches[0];
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const scaleX = canvasEl.width / rect.width;
    const scaleY = canvasEl.height / rect.height;
    
    const currentX = (touch.clientX - rect.left) * scaleX;
    const currentY = (touch.clientY - rect.top) * scaleY;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }
  
  // Public methods for template
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
    this.currentTool = 'pen'; // Switch to pen when color is selected
    if (this.ctx) {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.lineWidth;
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
  
  toggleTips() {
    this.showTips = !this.showTips;
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
        // Use the first question as fallback
        this.currentQuestion = this.whiteboardService['questions'][0];
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