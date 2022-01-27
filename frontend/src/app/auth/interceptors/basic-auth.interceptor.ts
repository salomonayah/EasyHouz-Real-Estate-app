import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../auth-services/authentication.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
        if (isLoggedIn && isApiUrl && user?.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${user?.token}`
                }
            });
        }

        return next.handle(request);
    }
}
