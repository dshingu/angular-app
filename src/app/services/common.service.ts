import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';

@Injectable({providedIn: 'root'})
export class CommonService 
{

    private errors: any = {};

    handleError (data: HttpErrorResponse) : [] {
        if (data.hasOwnProperty('error')) {
            if (data.error.hasOwnProperty('inner')) {
              data.error.inner.forEach((error: any) => {
                this.errors[error.path] = error.errors[0];
              });
            }
          }
        return this.errors;
    }

    setFlash(type: string = 'error', message: string) {
        const string = '<div class="alert alert-'+type+'"><p>'+message+'</p></div>';
        sessionStorage.setItem('__flash', string);
    }

    getFlash ()  {
        const  flash = sessionStorage.getItem('__flash');
        sessionStorage.removeItem('__flash');
        return flash;
    }

}