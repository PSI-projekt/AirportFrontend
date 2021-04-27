import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ApiPaths, environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PassengerForListDto} from './dtos/passenger-for-list.dto';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Passenger;
  }

  public getPassengersForUser(): Observable<Array<PassengerForListDto>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Array<PassengerForListDto>>(this.url, { headers }).pipe(
      map((responseData: Array<PassengerForListDto>) => responseData));
  }
}
