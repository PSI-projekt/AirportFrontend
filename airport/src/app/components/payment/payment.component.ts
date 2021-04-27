import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {PaymentDto} from '../../api/dtos/payment.dto';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  public paymentDetails: PaymentDto | undefined;

  constructor(private toastr: ToastrService, private router: Router, private commonService: CommonService) {
    this.paymentDetails = commonService.paymentDetails;
  }

  ngOnInit(): void {
    if (this.paymentDetails === undefined) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.commonService.paymentDetails = undefined;
  }

  copy(value: string | undefined): void {
    if (value !== undefined) {
      navigator.clipboard.writeText(value).then(
        () => this.toastr.info('Copy successful!'),
        () => this.toastr.error('Copy unsuccessful.')
      );
    }
  }
}
