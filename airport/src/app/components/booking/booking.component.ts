import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FlightDto} from '../../api/dtos/flight.dto';
import {FlightService} from '../../api/flight.service';
import {SeatCountForFlightDto} from '../../api/dtos/seat-count-for-flight.dto';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PassengerService} from '../../api/passenger.service';
import {PassengerForListDto} from '../../api/dtos/passenger-for-list.dto';
import {PassengerForBookingDto} from '../../api/dtos/passenger-for-booking.dto';
import {BookingForAddDto} from '../../api/dtos/booking-for-add.dto';
import {BookingService} from '../../api/booking.service';
import {PaymentDto} from '../../api/dtos/payment.dto';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit, OnDestroy {
  public selectedFlight: FlightDto | undefined;
  public seatCountForFlightDto: SeatCountForFlightDto | undefined;
  public numberOfPassengers = 1;
  public passengersForm!: FormGroup;
  public even: number[] = [];
  public odd: number[] = [];

  constructor(private toastr: ToastrService, private commonService: CommonService, private changeDetector: ChangeDetectorRef,
              private flightService: FlightService, public router: Router, private formBuilder: FormBuilder,
              private passengerService: PassengerService, private bookingService: BookingService) {
    this.selectedFlight = commonService.selectedFlight;
    this.passengersForm = formBuilder.group({});
    this.fillArrays();
  }

  ngOnInit(): void {
    if (this.selectedFlight === undefined) {
      this.router.navigate(['/']);
    }
    this.getNumberOfSeats();
    this.getPassengersData();
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.commonService.passengers = undefined;
  }

  private getNumberOfSeats(): void {
    if (this.selectedFlight?.id) {
      this.flightService.getFreeSeatsForFlight(this.selectedFlight?.id)
        .subscribe((response: SeatCountForFlightDto) => {
          this.seatCountForFlightDto = response;
        }, error => {
          this.toastr.error('There was an error while processing Your request.');
        });
    }
    else {
      this.router.navigate(['/']);
    }
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

  public changeValue(shouldAdd: boolean): void {
    this.numberOfPassengers += shouldAdd ? 1 : -1;
    this.numberOfPassengers = this.numberOfPassengers <= 0 ? 1 : this.numberOfPassengers;
    this.fillArrays();
    this.changeDetector.detectChanges();
  }

  public getPassengersData(): void {
    this.passengerService.getPassengersForUser().subscribe((response: Array<PassengerForListDto>) => {
      this.commonService.passengers = response;
    }, error => {
      this.toastr.info('Could not find any passengers in Your flight history. This data is available after first reservation with more than one passenger.');
    });
  }

  public submitForm(): void {
    const passengers = new Array<PassengerForBookingDto>();

    for (let i = 0; i < this.numberOfPassengers; i++) {
      const passenger: PassengerForBookingDto = {
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

    const booking: BookingForAddDto = {
      // @ts-ignore
      flightId: this.selectedFlight?.id,
      passengers
    };

    this.bookingService.makeBooking(booking).subscribe((response: PaymentDto) => {
      this.commonService.paymentDetails = response;
      this.router.navigate(['/payment']);
    }, () => {
      this.toastr.error('An error occurred while processing Your request. Please check Your inputs and try again');
    });
  }
}
