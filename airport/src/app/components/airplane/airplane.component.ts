import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { UserForDetailsDto } from '../../api/dtos/user-for-details.dto';
import { AirplaneService } from '../../api/airplane.service';
import { AirplaneForEditDto } from '../../api/dtos/airplane-for-edit.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { User } from '../../interfaces/user';
import { Privileges } from '../../enums/privileges.enum';
import { AirportForListDto } from '../../api/dtos/airport-for-list.dto';
import { AirportService } from '../../api/airport.service';
import { AirplaneForListDto } from '../../api/dtos/airplane-for-list.dto';

@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})
export class AirplaneComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public airports: Array<AirportForListDto> | undefined;
  public airplanes: Array<AirplaneForListDto> | undefined;
  public id: number | undefined;
  public locationId: number | undefined;
  public editForm = new FormGroup({
    maker: new FormControl(''),
    model: new FormControl(''),
    identifier: new FormControl(''),
    locationId: new FormControl(''),    
    airline: new FormControl(''),
    numberOfSeats: new FormControl(''),
    isInRepair: new FormControl(''),
  });

  constructor(private toastr: ToastrService, private userService: UserService,
    private airplaneService: AirplaneService, public router: Router, private authService: AuthService,
    private airportService: AirportService) {
      this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getAirports();
    this.getAirplanes();
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const airplane_: AirplaneForEditDto = {
      // @ts-ignore
      id: this.id,
      maker: form.controls['maker'].value,
      model: form.controls['model'].value,
      identifier: form.controls['identifier'].value,
      locationId: form.controls['locationId'].value,
      airline: form.controls['airline'].value,
      numberOfSeats: form.controls['numberOfSeats'].value,
      isInRepair: form.controls['isInRepair'].value           
    }
    this.isFetching = true;

    this.airplaneService.edit(airplane_).subscribe(
      resData => {
        this.toastr.success('The airplane information has been updated!', 'Success!');       
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );    
  }

  public setAirplane(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.airplanes[event.target.value]);
    }
  }
  public setValues(data: any): void {
    this.editForm.setValue({
      maker: data.maker,
      model: data.model,
      identifier: data.identifier,
      locationId: data.locationId,      
      airline: data.airline,
      numberOfSeats: data.numberOfSeats,
      isInRepair: data.isInRepair,            
    });
    this.id = data.id;
    this.locationId = data.locationId;
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
