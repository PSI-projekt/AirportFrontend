import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NumberToTextConverter } from 'src/app/helpers/number-to-text-converter';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../../api/user.service';
import { UserForDetailsDto } from '../../../../api/dtos/user-for-details.dto';
import { CommonService } from '../../../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import { PassengerForListDto } from '../../../../api/dtos/passenger-for-list.dto';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './passenger-edit.component.html',
  styleUrls: ['./passenger-edit.component.css']
})
export class PassengerEditComponent implements OnInit, OnDestroy {
  @Input() public id!: number;
  public numberString!: string;
  @Input() parentForm!: FormGroup;
  public passengers: Array<PassengerForListDto> | undefined;
  public user: UserForDetailsDto | undefined;

  constructor(private toastr: ToastrService, private userService: UserService, private commonService: CommonService) {
    this.passengers = commonService.passengers;
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
      this.setPassenger();
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

  public setPassenger(): void {
    this.setValues(this.commonService.passengers![this.id]);
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
