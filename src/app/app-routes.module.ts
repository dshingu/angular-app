import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { EditAppointmentComponent } from './components/appointments/editappointment/editappointment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { NonAuthGuard } from './guards/non-auth-guard';
import { AppointmentListComponent } from './components/appointments/appointment-list/appointment-list.component';
import { ViewAppointmentComponent } from './components/appointments/view-appointment/view-appointment.component';
import { AddAppointmentComponent } from './components/appointments/add-appointment/add-appointment.component';

const appRoutes: Route[] = [
    {path: 'auth/login', component: LoginComponent, canActivate: [NonAuthGuard]},
    {path: 'auth/register', component: RegisterComponent, canActivate: [NonAuthGuard]},
    {path: '', canActivate: [AuthGuard], component: AppointmentsComponent, children: [
      {path: '', component: AppointmentListComponent},
      {path: 'add',component: AddAppointmentComponent},
      {path: ':id', component: AppointmentsComponent},
      {path: ':id/update', component: EditAppointmentComponent},
      {path: ':id/view', component: ViewAppointmentComponent},
    ]},

    {path:'404', component: PageNotFoundComponent},
    {path:'**', redirectTo: '404'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule
{

    constructor () {}

}