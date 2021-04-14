import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../api/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(
      resData => {
        console.log(resData);
        this.toastr.success('Your are now logged in!', 'Success!');
      },
      errorMessasge => {
        console.log(errorMessasge);
        this.toastr.error(errorMessasge, 'Error');
      }
    );
  }
}
