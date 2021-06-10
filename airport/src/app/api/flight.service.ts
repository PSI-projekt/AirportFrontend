import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {FlightDto} from './dtos/flight.dto';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {ApiPaths, environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {PaginatedResult} from './dtos/pagination';
import {SeatCountForFlightDto} from './dtos/seat-count-for-flight.dto';
import {AuthService} from './auth.service';
import {FlightForAddDto} from "./dtos/flight-for-add.dto";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Flight;
  }

  public getCurrentFlights(page: number, itemsPerPage: number): Observable<PaginatedResult<Array<FlightDto>>> {
    const parameters = {
      pageNumber: page.toString(),
      pageSize: itemsPerPage.toString()
    };

    return this.http.get<any>(this.url, {observe: 'response', params: parameters})
      .pipe(map((response: any) => {
        const result = new PaginatedResult<Array<FlightDto>>();
        result.result = response.body;
        if (response.headers.get('pagination') !== null) {
          result.pagination = JSON.parse(response.headers.get('pagination') as string);
        }
        return result;
      }));
  }

  public getFreeSeatsForFlight(flightId: number): Observable<SeatCountForFlightDto> {
    const url = this.url + '/seats/' + flightId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<SeatCountForFlightDto>(url, { headers }).pipe(
      map((responseData: SeatCountForFlightDto) => responseData));
  }

  public addFlight(flight: FlightForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, flight, { headers }).pipe(catchError(this.handleError));
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
