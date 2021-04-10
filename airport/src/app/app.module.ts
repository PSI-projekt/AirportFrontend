import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { FlightRowComponent } from './components/home/flight-row/flight-row.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    FlightRowComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
