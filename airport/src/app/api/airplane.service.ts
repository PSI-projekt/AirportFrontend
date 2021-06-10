import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ApiPaths, environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {AirplaneForListDto} from './dtos/airplane-for-list.dto';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
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
        errorMessage = 'Wrong username or password';
        break;
    }
    return throwError(errorMessage);
  }
}
