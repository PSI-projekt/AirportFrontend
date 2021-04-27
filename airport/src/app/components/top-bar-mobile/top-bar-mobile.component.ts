import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthService} from '../../api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-mobile',
  templateUrl: './top-bar-mobile.component.html',
  styleUrls: ['./top-bar-mobile.component.css']
})
export class TopBarMobileComponent implements OnInit {
  public user: User | undefined;

  constructor(public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.authService.logout();
    this.user = undefined;
    this.router.navigate(['/']);
  }
}
