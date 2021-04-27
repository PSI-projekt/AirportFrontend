import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ApiPaths, environment} from '../../environments/environment';
import {BookingForAddDto} from './dtos/booking-for-add.dto';
import {Observable} from 'rxjs';
import {PaymentDto} from './dtos/payment.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Booking;
  }

  public makeBooking(bookingForAdd: BookingForAddDto): Observable<PaymentDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<PaymentDto>(this.url, bookingForAdd, { headers }).pipe(
      map((response: PaymentDto) => response));
  }
}
