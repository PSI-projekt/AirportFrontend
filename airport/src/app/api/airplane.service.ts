import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiPaths, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AirplaneForListDto} from './dtos/airplane-for-list.dto';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

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
}
