import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { User } from '../model/auth.model';
import { AuthState, AuthStateModel } from '../store/auth.state';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    @Select(AuthState) authState$: Observable<AuthStateModel>;

    user: User | null;

    authActive = false;

    isInterceptingRequest = false;

    constructor()
    {
      this.isInterceptingRequest = true;
      this.authState$.pipe(takeWhile(() => this.isInterceptingRequest))
      .subscribe((state) => {
        this.user = state.userData;
      });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.user && this.user.token;

        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${this.user?.token}`
                }
            });
        }

        return next.handle(request);
    }
}
