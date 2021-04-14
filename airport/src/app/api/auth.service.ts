import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponse {

}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(
      'https://localhost:5001/api/Auth/login',
      {
        username: username,
        password: password
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post(
      'https://localhost:5001/api/Auth/register',
      {
        username: username,
        password: password,
        email: email
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(errorRes: HttpErrorResponse) {
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
