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
  
  // Tools and colors - Added pink and more vibrant colors
  currentTool: 'pen' | 'eraser' = 'pen';
  currentColor = '#000000';
  lineWidth = 3;
  
  colors: string[] = [
    '#000000', // Black
    '#2563eb', // Blue
    '#ec4899', // Pink
    '#dc2626', // Red
    '#16a34a', // Green
    '#9333ea', // Violet
    '#f59e0b', // Orange
    '#0891b2'  // Cyan
  ];
  
  lineWidths = [2, 4, 6, 8, 12];
  
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
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }
  
  private initializeCanvas() {
    if (!this.canvas?.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    
    if (!this.ctx) {
      console.error('Could not get canvas context');
      return;
    }
    
    // Set canvas size to match container - make it larger
    const container = canvasEl.parentElement;
    if (container) {
      canvasEl.width = container.clientWidth;
      canvasEl.height = container.clientHeight - 10; // Small margin
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
    
    // Remove any existing listeners first
    canvasEl.removeEventListener('mousedown', this.startDrawing.bind(this));
    canvasEl.removeEventListener('mousemove', this.draw.bind(this));
    canvasEl.removeEventListener('mouseup', this.stopDrawing.bind(this));
    canvasEl.removeEventListener('mouseout', this.stopDrawing.bind(this));
    
    // Mouse events
    canvasEl.addEventListener('mousedown', (e) => this.startDrawing(e));
    canvasEl.addEventListener('mousemove', (e) => this.draw(e));
    canvasEl.addEventListener('mouseup', () => this.stopDrawing());
    canvasEl.addEventListener('mouseout', () => this.stopDrawing());
    
    // Prevent context menu
    canvasEl.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  private startDrawing(e: MouseEvent) {
    if (!this.ctx) return;
    
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
    
    // Start a new path immediately
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
  }
  
  private draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }
  
  private stopDrawing() {
    if (!this.isDrawing || !this.ctx) return;
    
    this.isDrawing = false;
    this.ctx.closePath();
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
      this.ctx.strokeStyle = 'rgba(255,255,255,1)';
      this.ctx.lineWidth = this.lineWidth * 3; // Larger eraser
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
    if (this.ctx) {
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
        // Fallback to show that questions are loading
        this.currentQuestion = {
          id: '1',
          title: 'Reverse a Linked List',
          description: `Design an algorithm to reverse a singly linked list. Consider edge cases like empty lists, single-node lists, and large lists.

STEPS TO SOLVE:
1. Initialize three pointers: previous (null), current (head), and next
2. Traverse through the list
3. For each node:
   - Store the next node
   - Reverse the current node's pointer to point to previous
   - Move previous to current
   - Move current to next
4. Return the new head (which is the previous pointer)

TIME COMPLEXITY: O(n) where n is the number of nodes
SPACE COMPLEXITY: O(1) for iterative approach

EDGE CASES:
- Empty list (head is null)
- Single node list
- Already reversed list
- List with cycles`,
          category: 'Data Structures',
          difficulty: 'medium',
          type: 'pseudocode',
          examples: [
            'Input: 1 → 2 → 3 → 4 → 5 → NULL',
            'Output: 5 → 4 → 3 → 2 → 1 → NULL',
            'Edge Case: Empty list → NULL',
            'Edge Case: Single node → Same node'
          ],
          constraints: [
            'Cannot modify node values, only change pointers',
            'Must use O(1) extra space',
            'Should handle lists with up to 10^4 nodes'
          ]
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