import { Injectable } from '@angular/core';
import { ApiPaths, environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AirportCountDto } from './dtos/airport-count.dto';
import { AirportForListDto } from './dtos/airport-for-list.dto';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
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
}
