//frontend/src/app/services/badge.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private apiUrl = 'http://localhost:5000/api/badges';

  constructor(private http: HttpClient) { }

  getUserBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.apiUrl}/user`);
  }

  awardBadge(badgeId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/award`, { badgeId });
  }

  getTopicBadges(topicId: string): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.apiUrl}/topic/${topicId}`);
  }
}