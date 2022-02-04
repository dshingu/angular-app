import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent extends BaseComponent implements OnInit {

  @ViewChild('form') form: any;
  appointment: any = '';
  processing: boolean = false;
  id: number = 0;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private common: CommonService) { super() }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

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

}
