import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpRequestInterceptorService implements HttpInterceptor 
{

    constructor (private authService: AuthService) {

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        
        return this.authService.user.pipe(take(1), exhaustMap((user: any) => {
            if (user) {
                const new_request = request.clone({
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.token)
                });
                return next.handle(new_request);
            }
            return next.handle(request);
        }));

    }

}