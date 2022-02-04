import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseComponent } from './components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  token: string = '';

  constructor (private authService: AuthService, private jwtHelper: JwtHelperService) { super(); }

  ngOnInit () : void {
      this.authService.autoLogin();
  }

}
