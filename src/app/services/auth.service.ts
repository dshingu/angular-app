import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService 
{

    user = new BehaviorSubject<User>(null!);
    tokenExpiry: any;

    constructor (private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
        
    }

    login (username: string, password: string) {
        const data = {username: username, password: password};
        return this.http.post('auth/login', data).pipe(tap((response: any) => {
            console.log(response);
            this.handleAuthentication(response.data.token);
        }));

    }

    autoLogin () {
        const token = sessionStorage.getItem('ng_app_user_token');
        if (token) {
            this.handleAuthentication(token);
        }
    }

    logout () {
        this.user.next(null!);
        this.router.navigate(['/auth/login']);
        sessionStorage.removeItem('ng_app_user_token');
    }

    autoLogout (interval: number) {
        this.tokenExpiry = setTimeout(() => {
            this.logout();
        }, interval);
    }

    register (username: string, first_name: string, last_name: string, email: string, password: string) {
        return this.http.post('auth/register', {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });
    }

    handleAuthentication (token: string) {
        const object = this.jwtHelper.decodeToken(token);
            const tokenExpiredAt = new Date(object.exp * 1000);
            if (new Date().getTime() >= tokenExpiredAt.getTime()) {
                this.user.next(null!);
                return;
            }
            const user = new User(
                object.id,
                object.username,
                object.PersonalInformation.first_name,
                object.PersonalInformation.last_name,
                object.PersonalInformation.email,
                token,
                tokenExpiredAt,
                object.verified
            );
            this.user.next(user);
            this.autoLogout(new Date(object.exp * 1000).getTime() - new Date().getTime());
            sessionStorage.setItem('ng_app_user_token', token);
    }

    handleError () {

    }



}