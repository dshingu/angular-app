import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent extends BaseComponent implements OnInit {

  processing: boolean = false;

  constructor(private appointmentService: AppointmentService, private router: Router) { super(); }

  ngOnInit(): void {
  }

  onSubmit (form: NgForm) {

    this.processing = true;

    const title: string = form.value.title;
    const description: string = form.value.description;
    const date: string = form.value.date;
    const time: string = form.value.time;
    const remind_me: boolean = form.value.remind_me ? true : false;
    
    this.appointmentService.addAppointment(title, description, date, time, remind_me).subscribe((response: any) => {

      this.processing = false;
      
      if (response.data.id) {
        this.setFlash('success', 'Appointment created successfully!');
        this.router.navigate(['/', response.data.id, 'view']);
      }
      
    }, (errorResponse: HttpErrorResponse) => {
      
      this.processing = false;
      this.handleError(errorResponse);

    });
    

  }

}
