import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  public isFetching = false;

  constructor(private authService: AuthService, private toastr: ToastrService, public router: Router) { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const email = form.value.email;
    this.isFetching = true;

    this.authService.register(username, password, email).subscribe(
      resData => {
        console.log(resData);
        this.toastr.success('Your account has been created!', 'Success!');
        this.router.navigate(['/login']);
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }
}
