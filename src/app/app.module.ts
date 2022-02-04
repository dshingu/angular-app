import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routes.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentListComponent } from './components/appointments/appointment-list/appointment-list.component';
import { EditAppointmentComponent } from './components/appointments/editappointment/editappointment.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpRequestInterceptorService } from './services/http-request-interceptor.service';
import { AuthHttpRequestInterceptorService } from './services/auth-http-request-interceptor.service';
import { ViewAppointmentComponent } from './components/appointments/view-appointment/view-appointment.component';
import { AddAppointmentComponent } from './components/appointments/add-appointment/add-appointment.component';
import { ConfirmComponent } from './components/confirm/confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    AppointmentsComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AppointmentListComponent,
    ViewAppointmentComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpRequestInterceptorService, multi: true},
    AuthService, AuthGuard, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
