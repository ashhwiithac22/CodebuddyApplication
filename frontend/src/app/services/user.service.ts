//frontend/src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface TestResult {
  id?: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timestamp: Date;
  topicName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  // Add this method to your UserService
  saveTestResult(result: TestResult): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/test-results`, result);
  }

  // Other existing methods...
  getUserProgress(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/progress`);
  }

  updateUserScore(score: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/score`, { score });
  }
}