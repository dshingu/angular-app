import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {

  

}
