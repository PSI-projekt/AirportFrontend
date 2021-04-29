import {Component, Input, OnInit} from '@angular/core';
import {FlightDto} from '../../../api/dtos/flight.dto';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {AuthService} from '../../../api/auth.service';
import {User} from '../../../interfaces/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-flight-row',
  templateUrl: './flight-row.component.html',
  styleUrls: ['./flight-row.component.css']
})
export class FlightRowComponent implements OnInit {
  @Input() public flight: FlightDto | undefined;
  user: User | undefined;

  constructor(private toastr: ToastrService, private datePipe: DatePipe, private router: Router,
              private commonService: CommonService, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // trick to make the time sent from api in normal format (24h) and change it to 12h time so the conversion from UTC is correct
    const dateOfDepartureUsString = new Date(this.flight?.dateOfDeparture as string).toLocaleString('en-US');
    const dateOfDeparture = new Date(dateOfDepartureUsString + ' UTC');
    // @ts-ignore
    this.flight?.timeOfDeparture = this.datePipe.transform(dateOfDeparture, 'HH:mm');
    // @ts-ignore
    this.flight?.dateOfDeparture = dateOfDeparture.toLocaleDateString();
    const dateOfArrivalUsString = new Date(this.flight?.dateOfArrival as string).toLocaleString('en-US');
    const dateOfArrival = new Date(dateOfArrivalUsString + ' UTC');
    // @ts-ignore
    this.flight?.timeOfArrival = this.datePipe.transform(dateOfArrival, 'HH:mm');
  }

  selectFlight(): void {
    if (this.user !== undefined && this.user.role === 0) {
      this.commonService.selectedFlight = this.flight;
      this.router.navigate(['/buy']);
    }
    else if (this.user === undefined) {
      this.toastr.info('Please Sign In before making a reservation.');
    }
  }
}
