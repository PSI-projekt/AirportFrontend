import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Privileges} from '../../../enums/privileges.enum';
import {Router} from '@angular/router';
import {AuthService} from '../../../api/auth.service';
import {User} from '../../../interfaces/user';
import {NgForm} from '@angular/forms';
import {FlightForAddDto} from '../../../api/dtos/flight-for-add.dto';
import {AirportService} from '../../../api/airport.service';
import {AirplaneService} from '../../../api/airplane.service';
import {AirplaneForListDto} from '../../../api/dtos/airplane-for-list.dto';
import {AirportForListDto} from '../../../api/dtos/airport-for-list.dto';
import {ToastrService} from 'ngx-toastr';
import {FlightService} from "../../../api/flight.service";

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;
  public airplanes: Array<AirplaneForListDto> | undefined;
  public airports: Array<AirportForListDto> | undefined;

  constructor(public router: Router, private authService: AuthService, private airportService: AirportService,
              private airplaneService: AirplaneService, private toastr: ToastrService, private flightService: FlightService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.redirect();
    this.getAirports();
    this.getAirplanes();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.applicationUser) {
      this.router.navigate(['/']);
    }
  }

  public onSubmit(flightForm: NgForm): void {
    const flight: FlightForAddDto = {
      dateOfDeparture: new Date(flightForm.value.dateOfDeparture),
      dateOfArrival: new Date(flightForm.value.dateOfArrival),
      originId: flightForm.value.originId,
      destinationId: flightForm.value.destinationId,
      flightNumber: flightForm.value.flightNumber,
      gate: flightForm.value.gate,
      status: flightForm.value.status,
      pricePerPassenger: flightForm.value.pricePerPassenger,
      airplaneId: flightForm.value.airplaneId
    };

    this.isFetching = true;

    this.flightService.addFlight(flight).subscribe(() =>
      {
        this.toastr.success('Successfully added flight', 'Success');
        this.isFetching = false;
      },
      errorMsg => {
        this.toastr.error(errorMsg, 'Error');
        this.isFetching = false;
      });
  }

  private getAirports(): void {
    this.airportService.GetAirports().subscribe((data: Array<AirportForListDto>) => {
      this.airports = data;
    }, error => {
      this.toastr.error('An error occurred', 'Error');
    });
  }

  private getAirplanes(): void {
    this.airplaneService.GetAirplanes().subscribe((data: Array<AirplaneForListDto>) => {
        this.airplanes = data;
      }, error => {
        this.toastr.error('An error occurred', 'Error');
      });
  }
}
