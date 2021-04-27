import { Component, OnInit } from '@angular/core';
import {AirportService} from '../../api/airport.service';
import {AirportCountDto} from '../../api/dtos/airport-count.dto';
import { ToastrService } from 'ngx-toastr';
import {FlightDto} from '../../api/dtos/flight.dto';
import {FlightService} from '../../api/flight.service';
import {PaginatedResult, Pagination} from '../../api/dtos/pagination';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public airportCount: any;
  public flights: Array<FlightDto> | undefined;
  public pagination: Pagination | undefined;
  public isFetching = false;
  public isFirstPage = false;
  public isLastPage = false;
  public fetchFailed = false;
  public shouldDisplayIcons = true;

  constructor(private toastr: ToastrService, private airportService: AirportService, private flightService: FlightService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.getNumberOfAirports();
    this.getFlights(this.commonService.lastPage);
    this.resizeScreen();
  }

  private getNumberOfAirports(): void {
    this.airportService.GetNumberOfAirports()
      .subscribe((response: AirportCountDto) => {
        this.airportCount = response.numberOfAirports;
      }, error => {
        this.toastr.error('There was an error while processing Your request.');
      });
  }

  public getFlights(pageNumber: number = 1, itemsPerPage: number = 20): void{
    this.isFetching = true;
    this.flightService.getCurrentFlights(pageNumber, itemsPerPage).subscribe((response: PaginatedResult<Array<FlightDto>>) => {
      this.isFetching = false;
      this.fetchFailed = false;

      this.flights = response.result;
      this.pagination = response.pagination;
      this.isFirstPage = this.pagination?.currentPage === 1;
      this.isLastPage = this.pagination?.totalPages === this.pagination?.currentPage;

      this.commonService.setLastPage(this.pagination?.currentPage);
    }, error => {
      this.isFetching = false;
      this.fetchFailed = true;

      this.toastr.error('There was an error while processing Your request.');
    });
  }

  public changePage(switchToNext: boolean): void {
    // @ts-ignore
    let targetPage = this.pagination?.currentPage;
    // @ts-ignore
    switchToNext ? targetPage++ : targetPage--;
    // @ts-ignore
    if (targetPage > this.pagination?.totalPages || targetPage < 1) { return; }

    this.getFlights(targetPage);
  }

  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldDisplayIcons = screenWidth > 870;
  }
}
