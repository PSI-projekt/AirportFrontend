import {Component, Input, OnInit} from '@angular/core';
import {PassengerForEditDto} from '../../../../api/dtos/passenger-for-edit.dto';

@Component({
  selector: 'app-passenger-row',
  templateUrl: './passenger-row.component.html',
  styleUrls: ['./passenger-row.component.css']
})
export class PassengerRowComponent implements OnInit {
  @Input() passenger: PassengerForEditDto | undefined;
  @Input() bookingId: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
