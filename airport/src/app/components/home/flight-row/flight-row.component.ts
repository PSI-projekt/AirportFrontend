import {Component, Input, OnInit} from '@angular/core';
import {FlightDto} from '../../../api/dtos/flight.dto';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-flight-row',
  templateUrl: './flight-row.component.html',
  styleUrls: ['./flight-row.component.css']
})
export class FlightRowComponent implements OnInit {
  @Input() public flight: FlightDto | undefined;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // trick to make the time sent from api in normal format (24h) and change it to 12h time so the conversion from UTC is correct
    // @ts-ignore
    const dateOfDepartureUsString = new Date(this.flight.dateOfDeparture).toLocaleString('en-US');
    const dateOfDeparture = new Date(dateOfDepartureUsString + ' UTC');
    // @ts-ignore
    this.flight.timeOfDeparture = (this.datePipe.transform(dateOfDeparture, 'HH:mm'));
    // @ts-ignore
    this.flight.dateOfDeparture = dateOfDeparture.toLocaleDateString();
    // @ts-ignore
    const dateOfArrivalUsString = new Date(this.flight?.dateOfArrival).toLocaleString('en-US');
    const dateOfArrival = new Date(dateOfArrivalUsString + ' UTC');
    // @ts-ignore
    this.flight.timeOfArrival = (this.datePipe.transform(dateOfArrival, 'HH:mm'));
  }

}
