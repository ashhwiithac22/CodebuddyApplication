// frontend/src/app/services/judge0.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Judge0Service {
  private apiUrl = 'http://localhost:5000/api/judge0';

  constructor(private http: HttpClient) { }

  submitCode(sourceCode: string, languageId: number, stdin: string): Observable<any> {
    // Mock implementation - replace with real API call to your backend
    console.log('Submitting code:', { sourceCode, languageId, stdin });
    
    // Simulate Judge0 response
    return of({
      stdout: stdin === '[2,7,11,15], 9' ? '[0,1]' : 
              stdin === '[3,2,4], 6' ? '[1,2]' : 
              stdin === '[3,3], 6' ? '[0,1]' : 'Test output',
      stderr: null,
      status: { id: 3, description: 'Accepted' }
    }).pipe(delay(1000));
  }

  // Real implementation would look like this:
  /*
  submitCode(sourceCode: string, languageId: number, stdin: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      source_code: sourceCode,
      language_id: languageId,
      stdin: stdin
    };

    return this.http.post(`${this.apiUrl}/execute`, body, { headers });
  }
  */
}