import {Component, Input, OnInit} from '@angular/core';
import {BookingForListDto} from '../../../api/dtos/booking-for-list.dto';
import {DatePipe} from '@angular/common';
import {BookingService} from '../../../api/booking.service';

@Component({
  selector: 'app-history-row',
  templateUrl: './history-row.component.html',
  styleUrls: ['./history-row.component.css']
})
export class HistoryRowComponent implements OnInit {
  @Input() public booking: BookingForListDto | undefined;

  constructor(private datePipe: DatePipe, private bookingService: BookingService) { }

  ngOnInit(): void {
    const dateOfDepartureUsString = new Date(this.booking?.flightDetails.dateOfDeparture as string).toLocaleString('en-US');
    const dateOfDeparture = new Date(dateOfDepartureUsString + ' UTC');
    // @ts-ignore
    this.booking?.flightDetails.timeOfDeparture = this.datePipe.transform(dateOfDeparture, 'HH:mm');
    // @ts-ignore
    this.booking?.flightDetails.dateOfDeparture = dateOfDeparture.toLocaleDateString();
    const dateOfArrivalUsString = new Date(this.booking?.flightDetails.dateOfArrival as string).toLocaleString('en-US');
    const dateOfArrival = new Date(dateOfArrivalUsString + ' UTC');
    // @ts-ignore
    this.booking?.flightDetails.timeOfArrival = this.datePipe.transform(dateOfArrival, 'HH:mm');
  }

  downloadPdf(): void {
    if (this.booking === undefined || this.booking.isCancelled) {
      return;
    }

    this.bookingService.getPdf(this.booking.id).subscribe(x => {
      const blob = new Blob([x], { type: 'application/pdf' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }

      const data = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = data;
      link.download = 'ticket.pdf';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}
