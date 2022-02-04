import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-editappointment',
  templateUrl: './editappointment.component.html',
  styleUrls: ['./editappointment.component.scss']
})
export class EditAppointmentComponent extends BaseComponent implements OnInit {
  @ViewChild('form') form: any;
  appointment: any = '';
  processing: boolean = false;
  id: number = 0;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router) { super(); }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.appointmentService.getAppointment(this.id).subscribe((response: any) => {
      
      this.appointment = response.data;

      this.form.setValue({
        title: response.data.title,
        description: response.data.description,
        date: response.data.date,
        time: response.data.time,
        remind_me: response.data.remind_me
      });
    });
  }

  onSubmit (form: NgForm) {

      this.processing = true;
      const id = this.id;
      const title = form.value.title;
      const description = form.value.description;
      const date = form.value.date;
      const remind_me = form.value.remind_me ? true : false;
      const time = form.value.time;

      this.appointmentService.updateAppointment(id, title, description, date, time, remind_me).subscribe(() => {

        this.processing = false;
        this.setFlash('success', 'Appointment updated successfully!');
        this.router.navigate(['/', id, 'view']);

      }, (errorResponse: any) => {

        this.processing = false;
        this.handleError(errorResponse);
        console.log(this.errors);

      });
  }

}
