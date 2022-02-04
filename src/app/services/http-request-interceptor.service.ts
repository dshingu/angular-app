import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class HttpRequestInterceptorService implements HttpInterceptor 
{
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const newRequest = request.clone({ url: environment.API_URL + request.url});
        return next.handle(newRequest);
    }

}