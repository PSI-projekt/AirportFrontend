import { Component, OnInit } from '@angular/core';
import {Privileges} from '../../../enums/privileges.enum';
import {User} from '../../../interfaces/user';
import {Router} from '@angular/router';
import {AuthService} from '../../../api/auth.service';
import {NgForm} from '@angular/forms';
import {EmployeeService} from '../../../api/employee.service';
import {EmployeeForAddDto} from '../../../api/dtos/employee-for-add.dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.css']
})
export class EmployeeAccountComponent implements OnInit {
  public user: User | undefined;
  public isPasswordTheSame = true;
  public isFetching = false;

  constructor(public router: Router, private authService: AuthService, private employeeService: EmployeeService,
              private toastr: ToastrService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.applicationUser || this.user.role === Privileges.employee) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(employeeForm: NgForm): void {
    const employee: EmployeeForAddDto = {
      username: employeeForm.value.username,
      password: employeeForm.value.password,
      email: employeeForm.value.email,
      firstName: employeeForm.value.firstName,
      lastName: employeeForm.value.lastName
    };

    this.employeeService.add(employee).subscribe(() => {
      this.toastr.success('Employee account created!', 'Success!');
      employeeForm.reset();
      this.isFetching = false;
    }, errorMessage => {
      this.toastr.error(errorMessage, 'Error');
      this.isFetching = false;
    });
  }

  checkPassword(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement;
    this.isPasswordTheSame = passwordField.value === confirmPasswordField.value;
  }

  resetForm(form: NgForm): void {
    form.reset();
    this.isPasswordTheSame = true;
  }
}
