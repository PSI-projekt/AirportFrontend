import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {AuthService} from '../../api/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  user: User | undefined;

  constructor(public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  logOut(): void {
    this.authService.logout();
    this.user = undefined;
    this.router.navigate(['/']);
  }
}
