import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
  providers: [AppointmentService]
})
export class AppointmentListComponent extends BaseComponent implements OnInit {

  appointments: Appointment[] = [];
  selected: any[] = [];
  verified: boolean = false;

  constructor (private appointmentService: AppointmentService, private authService: AuthService, private router: Router) { super(); }

  ngOnInit(): void {

    this.appointmentService.getAppointments().subscribe((response: any) => {
      this.appointments = response.data;
    });

    this.authService.user.subscribe((user: any) => {
      if (user) {
        this.verified = user.verified;
      }
    });

  }

  onSelected (e: any) {
    if (e.target.checked) {
      this.selected.push(e.target.value);
    } else {
      const index = this.selected.indexOf(e.target.value);
      this.selected.splice(index, 1);
    }
    e.stopPropagation();
  }

  onSelectAll(e: any) {

    this.selected = this.selected.slice();
    const app_row_checkbox = document.querySelectorAll('.appointment-row-checkbox');
    if (e.target.checked) {
      app_row_checkbox.forEach((element, index) => {
        console.log(element.getAttribute('checked'));
        let c = element.getAttribute('value') || 0;
        this.selected.push(c);
        element.toggleAttribute('checked', true);
      });
    } else {
      this.selected = [];
      app_row_checkbox.forEach((element, index) => {
        element.toggleAttribute('checked', false)
      });
    }

    console.log(this.selected);

  }

  OnAddAppointment () {
    this.router.navigate(['/', 'add']);
  }

  OnViewAppointment (id: number) {
    this.router.navigate(['/', id, 'view']);
  }

  OnEditAppointment (event: any, id: number) {
    this.router.navigate(['/', id, 'update']);
    event.stopPropagation();
  }

  OnDeleteAppointment (event: any, id: number) {
    this.confirm('Are you sure you want to remove this Appointment?');
    event.stopPropagation();
  }

}
