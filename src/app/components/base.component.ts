import { CommonService } from '../services/common.service';
import { HttpErrorResponse } from '@angular/common/http/http';
import { ConfirmComponent } from './confirm/confirm.component';
import { ComponentFactoryResolver } from '@angular/core';

export class BaseComponent {

    errors: any = {};
    flash: any = '';
    static confirm_message: string = '';
    static callback: any = function () {};

    constructor () {
        this.getFlash();
    }

    handleError (data: HttpErrorResponse) : void {
        if (data.hasOwnProperty('error')) {
            if (data.error.hasOwnProperty('inner')) {
                data.error.inner.forEach((error: any) => {
                this.errors[error.path] = error.errors[0];
                });
            }
        }
    }

    setFlash(type: string = 'error', message: string) {
        const string = '<div class="alert alert-'+type+'">'+message+'</div>';
        sessionStorage.setItem('__flash', string);
    }

    getFlash ()  {
        this.flash = sessionStorage.getItem('__flash');
        sessionStorage.removeItem('__flash');
    }

    confirm (message: string, callback = function () {}) {
        BaseComponent.callback = callback;
        BaseComponent.confirm_message = message;
    }

    getConfirm () {
        return BaseComponent.confirm_message;
    }
    
}