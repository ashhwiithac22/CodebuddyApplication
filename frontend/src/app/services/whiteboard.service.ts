import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WhiteboardQuestion } from '../models/whiteboard-question.model';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {
  private questions: WhiteboardQuestion[] = [
    {
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
    },
    {
      id: '2',
      title: 'Binary Tree Level Order Traversal',
      description: 'Explain the logic for level order traversal of a binary tree. Draw the tree and show the traversal order level by level.',
      category: 'Trees',
      difficulty: 'medium',
      type: 'logic',
      examples: [
        'Input: [3,9,20,null,null,15,7]',
        'Output: [[3],[9,20],[15,7]]'
      ]
    },
    {
      id: '3',
      title: 'Design URL Shortener',
      description: 'Design a URL shortening service like TinyURL. Draw the system architecture and explain the key components.',
      category: 'System Design',
      difficulty: 'hard',
      type: 'system-design',
      constraints: ['Handle 1000 requests per second', 'Short URLs should be unique']
    },
    {
      id: '4',
      title: 'Find Cycle in Directed Graph',
      description: 'Write pseudocode to detect a cycle in a directed graph. Draw a sample graph and trace the algorithm.',
      category: 'Graphs',
      difficulty: 'hard',
      type: 'pseudocode'
    }
  ];

  constructor(private http: HttpClient) {}

  getDailyWhiteboardChallenge(): Observable<WhiteboardQuestion> {
    // For now, return a random question. Later integrate with backend
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return of(this.questions[randomIndex]);
  }

  getQuestionsByDifficulty(difficulty: string): Observable<WhiteboardQuestion[]> {
    const filtered = this.questions.filter(q => q.difficulty === difficulty);
    return of(filtered);
  }

  getAllQuestions(): Observable<WhiteboardQuestion[]> {
    return of(this.questions);
  }

  saveDrawing(userId: string, questionId: string, drawingData: any): Observable<any> {
    // Save drawing to backend
    return this.http.post('/api/whiteboard/save', {
      userId,
      questionId,
      drawingData,
      timestamp: new Date()
    });
  }
}