import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  title: string = 'Appointment Manager';
  isVerified: boolean = false;
  username: string = '';
  private userSubscription: Subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.username = user.username;
        this.isAuthenticated = !user ? true : true;
        this.isVerified =  !user ? false : user.verified;
      }
    });
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }

}
