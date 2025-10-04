//frontend/src/app/models/whiteboard-question.model.ts
export interface WhiteboardQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  examples?: string[];
  constraints?: string[];
  type: 'pseudocode' | 'logic' | 'system-design';
}

export interface DrawingState {
  tool: 'pen' | 'eraser';
  color: string;
  lineWidth: number;
  actions: any[];
}