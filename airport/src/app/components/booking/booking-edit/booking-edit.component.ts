import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { BookingForListDto } from '../../../api/dtos/booking-for-list.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingForEditDto } from '../../../api/dtos/booking-for-edit.dto';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../../api/booking.service';
import { FlightService } from '../../../api/flight.service';
import { Router } from '@angular/router';
import { PassengerService } from '../../../api/passenger.service';
import { PassengerForListDto } from '../../../api/dtos/passenger-for-list.dto';
import { PassengerForBookingDto } from '../../../api/dtos/passenger-for-booking.dto';
import { PassengerForEditDto } from '../../../api/dtos/passenger-for-edit.dto';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {
  public booking: BookingForEditDto | undefined;
  public details: BookingForListDto | undefined;
  public passengers: Array<PassengerForEditDto> | undefined;
  public numberOfPassengers: number = 0;
  public passengersForm!: FormGroup;
  public even: number[] = [];
  public odd: number[] = [];
  public isFetching: boolean = false;

  constructor(private toastr: ToastrService, private commonService: CommonService,
    private flightService: FlightService, public router: Router, private formBuilder: FormBuilder,
    private passengerService: PassengerService, private bookingService: BookingService,
  )
  {
    this.details = this.commonService.bookingDetails;
    this.booking = this.commonService.selectedBooking;
    if (this.booking == undefined) {
      this.redirectTo('history');
    }
    this.passengersForm = formBuilder.group({});
  }

  ngOnInit(): void {
    this.getPassengersData();
  }
  private mapPassengers(): void {
    const passengers = new Array<PassengerForListDto>();

    for (let i = 0; i < this.details!.passengers.length; i++) {
      const passanger: PassengerForListDto = {
        firstName: this.details!.passengers[i].firstName,
        lastName: this.details!.passengers[i].lastName,
        country: this.details!.passengers[i].country,
        city: this.details!.passengers[i].city,
        street: this.details!.passengers[i].street,
        streetNumber: this.details!.passengers[i].streetNumber,
        postCode: this.details!.passengers[i].postCode,
        idNumber: this.details!.passengers[i].idNumber
      }
      passengers.push(passanger);
    }
    this.commonService.passengers = passengers;
  }

  public getPassengersData(): void {
    this.mapPassengers();
    this.passengers = this.details?.passengers;
    this.numberOfPassengers = this.passengers!.length;
    this.fillArrays();
  }

  public submitForm(): void {
    this.isFetching = true;
    const passengers = new Array<PassengerForEditDto>();

    for (let i = 0; i < this.numberOfPassengers; i++) {
      const passenger: PassengerForEditDto = {
        // @ts-ignore
        id: this.passengers[i]?.id,
        firstName: this.passengersForm.controls[`firstName${i}`].value,
        lastName: this.passengersForm.controls[`lastName${i}`].value,
        country: this.passengersForm.controls[`country${i}`].value,
        city: this.passengersForm.controls[`city${i}`].value,
        street: this.passengersForm.controls[`street${i}`].value,
        streetNumber: this.passengersForm.controls[`number${i}`].value.toString(),
        postCode: this.passengersForm.controls[`postalCode${i}`].value.toString(),
        idNumber: this.passengersForm.controls[`idNumber${i}`].value
      };
      passengers.push(passenger);
    }

    const booking: BookingForEditDto = {
      // @ts-ignore
      id: this.booking?.id,
      passengers
    };

    this.bookingService.edit(booking).subscribe(
      resData => {
        this.toastr.success('Your reservation has been updated!', 'Success!');
        this.redirectTo('history');
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      });
  }

  private fillArrays(): void {
    this.even = [];
    this.odd = [];
    for (let i = 0; i < this.numberOfPassengers; i++) {
      if (i % 2 === 0) {
        // @ts-ignore
        this.even.push(i);
      }
      else {
        this.odd.push(i);
      }
    }
  }

  private redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}
