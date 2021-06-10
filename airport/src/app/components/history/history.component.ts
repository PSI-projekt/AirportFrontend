import { Component, OnInit } from '@angular/core';
import {BookingForListDto} from '../../api/dtos/booking-for-list.dto';
import {PaginatedResult, Pagination} from '../../api/dtos/pagination';
import {BookingService} from '../../api/booking.service';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public isFetching = false;
  public bookings: Array<BookingForListDto> | undefined;
  public isFirstPage = false;
  public isLastPage = false;
  public pagination: Pagination | undefined;
  public userRole: number | undefined;

  constructor(private toastr: ToastrService, private bookingService: BookingService, private commonService: CommonService,
              private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.userRole = user?.role;
    });
  }

  ngOnInit(): void {
    this.getBookings();
  }

  public getBookings(pageNumber: number = 1, itemsPerPage: number = 10): void {
    this.isFetching = true;
    this.bookingService.getBookings(pageNumber, itemsPerPage).subscribe((response: PaginatedResult<Array<BookingForListDto>>) => {
      this.isFetching = false;

      this.bookings = response.result;
      this.pagination = response.pagination;
      this.isFirstPage = this.pagination?.currentPage === 1;
      this.isLastPage = this.pagination?.totalPages === this.pagination?.currentPage;

      this.commonService.setLastPageBookings(this.pagination?.currentPage);
    }, () => {
      this.isFetching = false;
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

    this.getBookings(targetPage);
  }
}
