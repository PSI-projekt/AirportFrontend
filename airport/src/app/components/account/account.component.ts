import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { UserForDetailsDto } from '../../api/dtos/user-for-details.dto';
import { AccountService } from '../../api/account.service';
import { UserForEditDto } from '../../api/dtos/user-for-edit.dto';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public isFetching = false;
  public loggedUser: User | undefined;
  public user: UserForDetailsDto | undefined;
  public editForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    idNumber: new FormControl(''),
    country: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    number: new FormControl(''),
    postalCode: new FormControl(''),
  });
  public EditModePD: boolean = false;
  public EditModeAD: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService,
    private accountService: AccountService, public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }
  
  ngOnInit(): void {
    this.getUserData();
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const user_: UserForEditDto = {
      // @ts-ignore
      id: this.loggedUser?.id,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      country: form.controls['country'].value,
      city: form.controls['city'].value,
      street: form.controls['street'].value,
      streetNumber: form.controls['number'].value.toString(),
      postCode: form.controls['postalCode'].value.toString(),
      idNumber: form.controls['idNumber'].value
    }

    this.isFetching = true;

    this.accountService.edit(user_).subscribe(
      resData => {
        this.toastr.success('Your account information has been updated!', 'Success!');
        this.redirectTo('/account');
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
    
    this.togglePD();
  }

  onDelete(): void {
    const userId: number = this.loggedUser?.id!;

    this.isFetching = true;

    this.accountService.delete(userId).subscribe(
      (res) => {
        this.isFetching = false;
        this.authService.logout();
        this.user = undefined;
        this.router.navigate(['/']);
        this.toastr.info('Your account has been deleted');
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  private getUserData(): void {
    this.userService.getUserDetails().subscribe((response: UserForDetailsDto) => {
      this.user = response;
      this.setValues(this.user);
    }, error => {
      this.toastr.error('An error occurred while fetching Your details.');
    });
  }

  public setValues(data: any): void {
    this.editForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      idNumber: data.idNumber,
      country: data.country,
      street: data.street,
      city: data.city,
      number: data.streetNumber,
      postalCode: data.postCode.replace('-', ''),
    });
  }

  public togglePD() {
    this.EditModePD = !this.EditModePD;
    if (!this.EditModePD) {
      this.editForm.controls['firstName'].disable();
      this.editForm.controls['lastName'].disable();
      this.editForm.controls['idNumber'].disable();
      this.editForm.controls['country'].disable();
      this.editForm.controls['street'].disable();
      this.editForm.controls['city'].disable();
      this.editForm.controls['number'].disable();
      this.editForm.controls['postalCode'].disable();
      this.setValues(this.user);
    }
    else {
      this.editForm.controls['firstName'].enable();
      this.editForm.controls['lastName'].enable();
      this.editForm.controls['idNumber'].enable();
      this.editForm.controls['country'].enable();
      this.editForm.controls['street'].enable();
      this.editForm.controls['city'].enable();
      this.editForm.controls['number'].enable();
      this.editForm.controls['postalCode'].enable();
    }
  }

  public toggleAD() {
    this.EditModeAD = !this.EditModeAD;
    if (!this.EditModeAD) {
      this.editForm.controls['email'].disable();
      this.editForm.controls['password'].disable();
      this.setValues(this.user);
    }
    else {
      this.editForm.controls['email'].enable();
      this.editForm.controls['password'].enable();
    }
  }

  private redirectTo(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
