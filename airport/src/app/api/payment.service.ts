import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ApiPaths, environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentReferenceDto } from './dtos/payment-reference.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Payment;
  }

  public confirm(paymentForConfirm: PaymentReferenceDto): Observable<PaymentReferenceDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<PaymentReferenceDto>(this.url, paymentForConfirm, { headers })
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
