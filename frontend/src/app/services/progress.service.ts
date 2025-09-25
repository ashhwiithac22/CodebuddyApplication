// frontend/src/app/services/progress.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface ProgressUpdate {
  difficulty: string;
  score: number;
  topic: {
    id: number;
    name: string;
  };
  problemId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = 'http://localhost:5000/api/progress';

  constructor(private http: HttpClient) { }

  updateProgress(progress: ProgressUpdate): Observable<any> {
    // Mock implementation - replace with real API call
    console.log('Updating progress:', progress);
    return of({ success: true, message: 'Progress updated' }).pipe(delay(500));
  }

  completeTopic(topicId: number, topicName: string): Observable<any> {
    // Mock implementation - replace with real API call
    console.log('Completing topic:', topicId, topicName);
    return of({ success: true, message: 'Topic completed', badge: `${topicName} Master` }).pipe(delay(500));
  }

  getUserProgress(): Observable<any> {
    // Mock implementation
    return of({
      totalPoints: 0,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      streak: 0,
      badges: []
    });
  }
}