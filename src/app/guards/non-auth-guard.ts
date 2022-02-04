import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate
{

    constructor (private authService: AuthService, private router: Router) {

    }

    canActivate ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean |  UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user => {
            console.log(user);
            if (!user) return true;
            return this.router.createUrlTree(['/appoinments']);
        }));
    }


}