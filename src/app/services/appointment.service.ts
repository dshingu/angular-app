import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { take, tap, exhaustMap, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import   * as moment   from 'moment';
import { Appointment } from '../components/appointments/appointment.model';

@Injectable({providedIn: 'root'})
export class AppointmentService 
{

    constructor (private http: HttpClient, private authService: AuthService) {
    }

    addAppointment (title: string, description: string, date: string, time: string, remind_me: boolean) {
        return this.http.post('appointments', {
            title: title,
            description: description,
            date: date,
            time: time,
            remind_me: remind_me
        });
    }

    getAppointments () {
        return this.http.get('appointments');
    }

    getAppointment (id: number) {
        return this.http.get('appointments/'+id).pipe(map((response: any) => {
           const date = moment(response.data.date);
           response.data.date = date.format(environment.date_format);
           response.data.time = date.format('HH:mm');
           return response;     
        }));
    }

    updateAppointment (id: number, title: string, description: string, date: string, time: string, remind_me: boolean) {
        return this.http.put('appointments/update/'+id, {
            id: id,
            title: title,
            description: description,
            date: date,
            time: time,
            remind_me: remind_me
        });
    }


}