import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ApiPaths, environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + ApiPaths.Auth;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url+'/login',
      {
        username,
        password
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(this.url + '/register',
      {
        username,
        password,
        email
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    switch (errorRes.status) {
      case 500:
        errorMessage = 'The server error occurred';
        break;
      case 400:
        errorMessage = errorRes.error;
        break;
      case 401:
        errorMessage = 'Wrong username or password';
        break;
    }
    return throwError(errorMessage);
  }
}
