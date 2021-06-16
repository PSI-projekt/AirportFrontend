import { Injectable } from '@angular/core';
import {ApiPaths, environment} from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import { UserForLoginDto } from './dtos/user-for-login-dto';
import {User} from '../interfaces/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from './auth.service';
import { AirplaneForEditDto } from './dtos/airplane-for-edit.dto';
import { AirplaneForListDto } from './dtos/airplane-for-list.dto';
import {AirplaneForAddDto} from "./dtos/airplane-for-add.dto";


@Injectable({
  providedIn: 'root'
})

export class AirplaneService {
  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Airplane;
  }

  public GetAirplanes(): Observable<Array<AirplaneForListDto>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Array<AirplaneForListDto>>(this.url, { headers }).pipe(

    map((responseData: Array<AirplaneForListDto>) => responseData));
  }

  public edit(airplaneForEdit: AirplaneForEditDto): Observable<AirplaneForEditDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    
    return this.http.patch<AirplaneForEditDto>(this.url, airplaneForEdit, { headers })
      .pipe(catchError(this.handleError)
    );
  }

  public CreateAirplane(airplane: AirplaneForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, airplane, {headers}).pipe(catchError(this.handleError));
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
