import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { UserForDetailsDto } from '../../api/dtos/user-for-details.dto';
import { AirplaneService } from '../../api/airplane.service';
import { AirplaneForEditDto } from '../../api/dtos/airplane-for-edit.dto';
import { AirplaneForListDto } from '../../api/dtos/airplane-for-list.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { User } from '../../interfaces/user';
import { Privileges } from '../../enums/privileges.enum';

@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})
export class AirplaneComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public airplanes: Array<AirplaneForListDto> | undefined;
  public id: number | undefined;
  public editForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),    
    codeIATA: new FormControl(''),
  });

  constructor(private toastr: ToastrService, private userService: UserService,
    private airplaneService: AirplaneService, public router: Router, private authService: AuthService) {
      this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getAirplanesList();
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

  private getAirplaneList(): void {
    if (this.loggedUser === undefined || this.loggedUser.role === Privileges.applicationUser) {
        this.router.navigate(['/'])
      }

      else {
        this.airplaneService.getAirplaneList().subscribe((response: Array<AirplaneForListDto>) => {
          this.airplanes = response;
          this.setValues(this.airplanes);
        }, error => {
          this.toastr.error('An error occurred while fetching the airplane details.');
        });
      }
  }

  public setAirplane(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.airplanes[event.target.value]);
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
  }  
} 