import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const email = form.value.email;

    this.authService.register(username, password, email).subscribe(
      resData => {
        console.log(resData);
        this.toastr.success('Your account has been created!', 'Success!');
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
      }
    );
  }
}
