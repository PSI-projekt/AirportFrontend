import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NumberToTextConverter } from 'src/app/helpers/number-to-text-converter';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../api/user.service';
import {UserForDetailsDto} from '../../../api/dtos/user-for-details.dto';
import {CommonService} from '../../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {PassengerForListDto} from '../../../api/dtos/passenger-for-list.dto';
import {AuthService} from '../../../api/auth.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit, OnDestroy {
  @Input() public id!: number;
  public numberString!: string;
  @Input() parentForm!: FormGroup;
  public passengers: Array<PassengerForListDto> | undefined;
  public user: UserForDetailsDto | undefined;
  public userRole: number | undefined;

  constructor(private toastr: ToastrService, private userService: UserService, private commonService: CommonService,
              private authService: AuthService) {
    this.passengers = commonService.passengers;
    this.authService.currentUser$.subscribe(user => {
      this.userRole = user?.role;
    });
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.numberString = NumberToTextConverter.ConvertNumber(this.id + 1);
      this.parentForm.addControl(
        `firstName${this.id}`, new FormControl(),
      );
      this.parentForm.addControl(
        `lastName${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `idNumber${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `country${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `street${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `city${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `number${this.id}`, new FormControl()
      );
      this.parentForm.addControl(
        `postalCode${this.id}`, new FormControl()
      );
    }

    if (this.id === 0) {
      this.getUserData();
    }
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(`firstName${this.id}`);
    this.parentForm.removeControl(`lastName${this.id}`);
    this.parentForm.removeControl(`idNumber${this.id}`);
    this.parentForm.removeControl(`country${this.id}`);
    this.parentForm.removeControl(`street${this.id}`);
    this.parentForm.removeControl(`city${this.id}`);
    this.parentForm.removeControl(`number${this.id}`);
    this.parentForm.removeControl(`postalCode${this.id}`);
  }

  private getUserData(): void {
    this.userService.getUserDetails().subscribe((response: UserForDetailsDto) => {
      this.user = response;

      if (this.commonService.passengers !== undefined) {
        for (let i = 0; i < this.commonService.passengers.length; i++) {
          if (this.commonService.passengers[i].idNumber === response.idNumber) {
            this.commonService.passengers.splice(i, 1);
          }
        }
      }
    }, error => {
      this.toastr.error('An error occurred while fetching Your details.');
    });
  }

  public setPassenger(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.passengers[event.target.value]);
    }
    if (event.target.value === 'Clear data') {
      const empty: PassengerForListDto = {
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        street: '',
        streetNumber: '',
        postCode: '',
        idNumber: ''
      };

      this.setValues(empty);
    }
  }

  public setValues(data: any): void {
    this.parentForm.controls[`firstName${this.id}`].setValue(data.firstName);
    this.parentForm.controls[`lastName${this.id}`].setValue(data.lastName);
    this.parentForm.controls[`idNumber${this.id}`].setValue(data.idNumber);
    this.parentForm.controls[`country${this.id}`].setValue(data.country);
    this.parentForm.controls[`street${this.id}`].setValue(data.street);
    this.parentForm.controls[`city${this.id}`].setValue(data.city);
    this.parentForm.controls[`number${this.id}`].setValue(data.streetNumber);
    this.parentForm.controls[`postalCode${this.id}`].setValue(data.postCode.replace('-', ''));
  }
}
