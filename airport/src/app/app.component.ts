import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public shouldBeDropdown = false;

  constructor(public router: Router, public platform: Platform) {
  }

  ngOnInit(): void {
    this.resizeScreen();
  }

  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldBeDropdown = screenWidth <= 1000 || this.platform.ANDROID || this.platform.IOS;
  }
}
