import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {FlightDto} from './dtos/flight.dto';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {ApiPaths, environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {PaginatedResult} from './dtos/pagination';
import {query} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly url: string;

  constructor(private http: HttpClient) {
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
}
