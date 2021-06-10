import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import { ApiPaths, environment } from '../../environments/environment';
import { UserForLoginDto } from './dtos/user-for-login-dto';
import {User} from '../interfaces/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import { UserForEditDto } from './dtos/user-for-edit.dto';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private readonly url: string;

  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.User;
  }

  public edit(userForEdit: UserForEditDto): Observable<UserForEditDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<UserForEditDto>(this.url, userForEdit, { headers })
      .pipe(catchError(this.handleError)
    );
  }

  public delete(userId: number): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<number>(this.url + `/delete/${userId}`, userId, { headers })
      .pipe(catchError(this.handleError)
    );
  }

  private handleError(errorRes: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred';

    switch (errorRes.status) {
      case 500:
        errorMessage = 'The server error occurred';
        break;
      case 400:
        errorMessage = errorRes.error;
        break;
      case 401:
        errorMessage = 'You are not allowed to do this';
        break;
    }
    return throwError(errorMessage);
  }
}









