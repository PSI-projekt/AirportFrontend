import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {ApiPaths, environment} from '../../environments/environment';
import {BookingForAddDto} from './dtos/booking-for-add.dto';
import {Observable, throwError} from 'rxjs';
import {PaymentDto} from './dtos/payment.dto';
import {catchError, map} from 'rxjs/operators';
import {BookingForListDto} from './dtos/booking-for-list.dto';
import {PaginatedResult} from './dtos/pagination';
import { BookingForEditDto } from './dtos/booking-for-edit.dto';

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

  public getBookings(page: number, itemsPerPage: number): Observable<PaginatedResult<Array<BookingForListDto>>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const parameters = {
      pageNumber: page.toString(),
      pageSize: itemsPerPage.toString()
    };

    const url = this.url + '/bookings';

    return this.http.get<any>(url, { headers, params: parameters, observe: 'response'})
      .pipe(map((response: any) => {
        const result = new PaginatedResult<Array<BookingForListDto>>();
        result.result = response.body;
        if (response.headers.get('pagination') !== null) {
          result.pagination = JSON.parse(response.headers.get('pagination') as string);
        }
        return result;
      }));
  }

  public getPdf(bookingId: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = this.url + '/pdf/' + bookingId;

    return this.http.get(url, {responseType: 'blob', headers});
  }

  public edit(bookingForEdit: BookingForEditDto): Observable<BookingForEditDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    const url = this.url + '/edit';

    return this.http.patch<BookingForEditDto>(url, bookingForEdit, { headers })
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
