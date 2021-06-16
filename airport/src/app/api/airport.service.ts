import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import { ApiPaths, environment } from '../../environments/environment';
import { UserForLoginDto } from './dtos/user-for-login-dto';
import {User} from '../interfaces/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from './auth.service';
import { AirportForEditDto } from './dtos/airport-for-edit.dto';
import { AirportForListDto } from './dtos/airport-for-list.dto';
import { AirportCountDto } from './dtos/airport-count.dto';
import { AirportForAddDto } from './dtos/airport-for-add.dto';

@Injectable({
  providedIn: 'root'
})

export class AirportService {

  private readonly url: string;


  constructor(private http: HttpClient, private toastr: ToastrService, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.AirportApi;
  }

  public GetNumberOfAirports(): Observable<AirportCountDto> {
    const url = this.url + '/count';

    return this.http.get<AirportCountDto>(url).pipe(
      map((responseData: AirportCountDto) => responseData));
  }

  public GetAirports(): Observable<Array<AirportForListDto>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Array<AirportForListDto>>(this.url, { headers }).pipe(
      map((responseData: Array<AirportForListDto>) => responseData));
  }

  public addAirport(airport: AirportForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, airport, { headers }).pipe(catchError(this.handleError));
  }

  public edit(airportForEdit: AirportForEditDto): Observable<AirportForEditDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<AirportForEditDto>(this.url, airportForEdit, { headers })
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
