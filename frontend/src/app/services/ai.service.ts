import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:5000/api/ai';

  constructor(private http: HttpClient) { }

  generateInterviewQuestions(category: string, difficulty: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/generate-questions`, { category, difficulty });
  }

  evaluateAnswer(question: string, answer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evaluate-answer`, { question, answer });
  }

  getHint(questionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hint/${questionId}`);
  }
}