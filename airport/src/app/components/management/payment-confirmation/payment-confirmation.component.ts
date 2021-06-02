import { Component, OnInit } from '@angular/core';
import {Privileges} from '../../../enums/privileges.enum';
import {User} from '../../../interfaces/user';
import {Router} from '@angular/router';
import {AuthService} from '../../../api/auth.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { PaymentReferenceDto } from '../../../api/dtos/payment-reference.dto';
import { PaymentService } from '../../../api/payment.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  public user: User | undefined;
  public isPasswordTheSame = true;
  public isFetching = false;
  public confirmationForm = new FormGroup({
    referenceNumber: new FormControl(''),
  });

  constructor(public router: Router, private authService: AuthService,
    private toastr: ToastrService, private paymentService: PaymentService) {
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

  onSubmit(confirmationForm: FormGroup): void {
    if (!confirmationForm.valid) {
      return;
    }

    this.isFetching = true;

    const payment_: PaymentReferenceDto = {
      // @ts-ignore
      referenceNumber: confirmationForm.value.referenceNumber
    }

    this.isFetching = true;

    this.paymentService.confirm(payment_).subscribe(
      resData => {
        this.toastr.success('Payment has been confirmed', 'Success!');
        this.confirmationForm.reset();
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  paste(): void {
    this.confirmationForm.reset();
    navigator['clipboard'].readText().then(
      clipText => { console.log(clipText); this.confirmationForm.setValue({ referenceNumber: clipText }) }
    );
  }
}
