import { Injectable } from '@angular/core';
import { BookingForEditDto } from '../api/dtos/booking-for-edit.dto';
import { BookingForListDto } from '../api/dtos/booking-for-list.dto';
import {FlightDto} from '../api/dtos/flight.dto';
import {PassengerForListDto} from '../api/dtos/passenger-for-list.dto';
import {PaymentDto} from '../api/dtos/payment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public lastPage: number;
  public lastPageBookings: number;
  public selectedFlight: FlightDto | undefined;
  public passengers: Array<PassengerForListDto> | undefined;
  public paymentDetails: PaymentDto | undefined;
  public bookingDetails: BookingForListDto | undefined;
  public selectedBooking: BookingForEditDto | undefined;

  constructor() {
    this.lastPage = 1;
    this.lastPageBookings = 1;
  }

  public setLastPage(page: number | undefined): void {
    this.lastPage = page === undefined ? 1 : page;
  }

  public setLastPageBookings(page: number | undefined): void {
    this.lastPageBookings = page === undefined ? 1 : page;
  }
}
