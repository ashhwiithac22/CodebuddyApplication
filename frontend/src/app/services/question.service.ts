import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:5000/api/questions';

  constructor(private http: HttpClient) { }

  getDailyQuestions(): Observable<any[]> {
    // Mock data - replace with actual API call
    return new Observable(observer => {
      const questions = [
        {
          id: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          defaultCode: 'def twoSum(nums, target):\n    # Your code here\n    pass',
          testCases: [
            { input: '[2,7,11,15], 9', output: '[0,1]' },
            { input: '[3,2,4], 6', output: '[1,2]' }
          ]
        },
        {
          id: 2,
          title: 'Reverse String',
          difficulty: 'Easy',
          description: 'Write a function that reverses a string. The input string is given as an array of characters.',
          defaultCode: 'def reverseString(s):\n    # Your code here\n    pass',
          testCases: [
            { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
            { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
          ]
        },
        {
          id: 3,
          title: 'Binary Tree Inorder Traversal',
          difficulty: 'Medium',
          description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
          defaultCode: 'def inorderTraversal(root):\n    # Your code here\n    pass',
          testCases: [
            { input: '[1,null,2,3]', output: '[1,3,2]' },
            { input: '[]', output: '[]' }
          ]
        }
      ];
      observer.next(questions);
      observer.complete();
    });
  }

  runCode(code: string, questionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/run`, { code, questionId });
  }

  submitCode(code: string, questionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, { code, questionId });
  }
}