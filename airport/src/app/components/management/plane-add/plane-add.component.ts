import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../api/auth.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../interfaces/user';
import {FormGroup, NgForm} from "@angular/forms";
import {AirplaneForAddDto} from "../../../api/dtos/airplane-for-add.dto";
import {AirplaneService} from "../../../api/airplane.service";

@Component({
  selector: 'app-plane-add',
  templateUrl: './plane-add.component.html',
  styleUrls: ['./plane-add.component.css']
})
export class PlaneAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;

  constructor(public router: Router, private authService: AuthService, private toastr: ToastrService,
              private airplaneService: AirplaneService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    const airplane: AirplaneForAddDto = {
      maker: form.value.maker,
      model: form.value.model,
      identifier: form.value.identifier,
      airline: form.value.airline,
      isInRepair: false,
      locationId: 1
    };

    this.isFetching = true;

    this.airplaneService.CreateAirplane(airplane).subscribe(() => {
      this.toastr.success('Successfully added airplane', 'Success');
      this.isFetching = false;
    }, errorMsg => {
      this.toastr.error(errorMsg, 'Error');
      this.isFetching = false;
    });
  }
}
