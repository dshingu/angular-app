import { Component, OnInit } from '@angular/core';
import { Register } from './register.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  isProcessing: boolean = false;

  model: Register = new Register;

  
  constructor(private authService: AuthService, private router: Router, private common: CommonService) { super(); }

  ngOnInit(): void {

  }

  onSubmit (form: NgForm) {
    this.isProcessing = true;
    this.errors = {};

    this.authService.register(
      form.value.username,
      form.value.first_name,
      form.value.last_name,
      form.value.email,
      form.value.password
    ).subscribe((response: any) => {

      this.isProcessing = false;
      if (response.hasOwnProperty('success') && response.success) {
        sessionStorage.setItem('ng_app_user_token', response.data.token);
        this.authService.handleAuthentication(response.data.token);
        this.router.navigate(['/']);
      }

    }, (errorResponse: any) => {

      this.isProcessing = false;
      this.errors = this.handleError(errorResponse);

    });
  }

}
