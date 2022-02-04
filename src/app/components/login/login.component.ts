import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() title: string = '';
  login: Login = {username:'', password: ''};
  isProcessing: boolean = false;
  errorMessage: string = '';
  @ViewChild('loginForm') form: NgForm = new NgForm([], []);

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {

    // interval(1000).subscribe((count: any) => {
    //   console.log(count);
    // });
  }

  onSubmit () {
  
    this.isProcessing = true;
    this.errorMessage = '';

    this.authService.login(this.form.value.username, this.form.value.password).subscribe((response: any) => {
        this.isProcessing = false;
        this.router.navigate(['/appointments']);
      }, (response: any) => {
        this.isProcessing = false;
        this.errorMessage = response.error.message;
      });
  }

}
