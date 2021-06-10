import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { FlightRowComponent } from './components/home/flight-row/flight-row.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { PassengerComponent } from './components/booking/passenger/passenger.component';
import {PlatformModule} from '@angular/cdk/platform';
import { TopBarMobileComponent } from './components/top-bar-mobile/top-bar-mobile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ManagementComponent } from './components/management/management.component';
import { AccountComponent } from './components/account/account.component';
import { EmployeeAccountComponent } from './components/management/employee-account/employee-account.component';
import { HistoryComponent } from './components/history/history.component';
import { HistoryRowComponent } from './components/history/history-row/history-row.component';
import { PassengerRowComponent } from './components/history/history-row/passenger-row/passenger-row.component';
import { AirplaneComponent } from './components/airplane/airplane.component';
import { PaymentConfirmationComponent } from './components/management/payment-confirmation/payment-confirmation.component';
import { FlightAddComponent } from './components/management/flight-add/flight-add.component';
import { PlaneAddComponent } from './components/management/plane-add/plane-add.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buy', component: BookingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'account', component: AccountComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'management/employee/create', component: EmployeeAccountComponent },  
  { path: 'management/airplane/edit', component: AirplaneComponent }
  { path: 'management/payment/confirm', component: PaymentConfirmationComponent },
  { path: 'management/flight/add', component: FlightAddComponent },
  { path: 'management/airplane/add', component: PlaneAddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    FlightRowComponent,
    LoginComponent,
    RegisterComponent,
    BookingComponent,
    PassengerComponent,
    TopBarMobileComponent,
    PaymentComponent,
    ManagementComponent,
    AccountComponent,
    EmployeeAccountComponent,
    HistoryComponent,
    HistoryRowComponent,
    PassengerRowComponent,
    AirplaneComponent,
    PaymentConfirmationComponent,
    FlightAddComponent,
    PlaneAddComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PlatformModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
