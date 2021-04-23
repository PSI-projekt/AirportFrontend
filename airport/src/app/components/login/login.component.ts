import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public isFetching = false;

  constructor(private authService: AuthService, private toastr: ToastrService, public router: Router) { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isFetching = true;

    this.authService.login(username, password).subscribe(
      resData => {
        this.toastr.success('Your are now logged in!', 'Success!');
        this.router.navigate(['/']);
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
