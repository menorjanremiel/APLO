import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public url = 'https://codebreakerss.com/api';
  // public url = 'http://localhost/gcattend/api';
  // public url = 'https://gordoncollege.edu.ph/ccsprojects/gcattend/codebreakers';
  private dateRangeSource = new BehaviorSubject<{
    start: Date;
    end: Date;
  } | null>(null);
  dateRange$ = this.dateRangeSource.asObservable();

  constructor(private http: HttpClient) {}

  apiRequest(method: string, data: any): Observable<any> {
    return this.http.post(`${this.url}${method}`, data).pipe(
      catchError(this.handleError) // Catch errors
    );
  }

  setDateRange(dateRange: { start: Date; end: Date }) {
    this.dateRangeSource.next(dateRange);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Return a user-friendly error message
  }
}
