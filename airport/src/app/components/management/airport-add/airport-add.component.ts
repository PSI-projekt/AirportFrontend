import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../api/auth.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../interfaces/user';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {AirportForAddDto} from "../../../api/dtos/airport-for-add.dto";
import {AirportService} from "../../../api/airport.service";
import {Privileges} from "../../../enums/privileges.enum";

@Component({
  selector: 'app-airport-add',
  templateUrl: './airport-add.component.html',
  styleUrls: ['./airport-add.component.css']
})
export class AirportAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;
  public airportForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    codeIATA: new FormControl(''),
  });

  constructor(public router: Router, private authService: AuthService, private toastr: ToastrService,
              private airportService: AirportService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.applicationUser) {
      this.router.navigate(['/']);
    }
  }

  public onSubmit(airportForm: FormGroup): void {
    const airport: AirportForAddDto = {
      name: airportForm.value.name,
      country: airportForm.value.country,
      city: airportForm.value.city,
      street: airportForm.value.street,
      codeIATA: airportForm.value.codeIATA
    };

    this.isFetching = true;

    this.airportService.addAirport(airport).subscribe(() => {
      this.toastr.success('Successfully added airport', 'Success');
      this.isFetching = false;
    }, errorMsg => {
      this.toastr.error(errorMsg, 'Error');
      this.isFetching = false;
    });
  }
}
