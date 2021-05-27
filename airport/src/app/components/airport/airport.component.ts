import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { UserForDetailsDto } from '../../api/dtos/user-for-details.dto';
import { AirportService } from '../../api/airport.service';
import { AirportForEditDto } from '../../api/dtos/airport-for-edit.dto';
import { AirportForListDto } from '../../api/dtos/airport-for-list.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { User } from '../../interfaces/user';
import { Privileges } from '../../enums/privileges.enum';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public airports: Array<AirportForListDto> | undefined;
  public id: number | undefined;
  public editForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),    
    codeIATA: new FormControl(''),
  });

  constructor(private toastr: ToastrService, private userService: UserService,
    private airportService: AirportService, public router: Router, private authService: AuthService) {
      this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getAirportList();
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const airport_: AirportForEditDto = {
      // @ts-ignore
      id: this.id,
      name: form.controls['name'].value,
      country: form.controls['country'].value,
      city: form.controls['city'].value,
      street: form.controls['street'].value,
      codeIATA: form.controls['codeIATA'].value
    }

    this.isFetching = true;

    this.airportService.edit(airport_).subscribe(
      resData => {
        this.toastr.success('The airport information has been updated!', 'Success!');       
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );    
  }

  private getAirportList(): void {
    if (this.loggedUser === undefined || this.loggedUser.role === Privileges.applicationUser) {
      this.router.navigate(['/'])
    }
    else {
      this.airportService.getAirportList().subscribe((response: Array<AirportForListDto>) => {
        this.airports = response;
        this.setValues(this.airports);
      }, error => {
        this.toastr.error('An error occurred while fetching the airport details.');
      });
    }
  }

  public setAirport(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.airports[event.target.value]);
    }
  }

  public setValues(data: any): void {
    this.editForm.setValue({
      name: data.name,
      country: data.country,
      city: data.city,
      street: data.street,      
      codeIATA: data.codeIATA,      
    });
    this.id = data.id;
  }  
}
