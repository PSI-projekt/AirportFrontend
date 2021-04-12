import { Injectable } from '@angular/core';
import {ApiPaths, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AirportCountDto} from './dtos/airport-count.dto';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + ApiPaths.AirportApi;
  }

  public GetNumberOfAirports(): Observable<AirportCountDto> {
    const url = this.url + '/count';

    return this.http.get<AirportCountDto>(url).pipe(
      map((responseData: AirportCountDto) => responseData));
  }
}
