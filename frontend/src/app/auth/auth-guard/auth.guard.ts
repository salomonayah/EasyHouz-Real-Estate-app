import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AuthenticationService } from '../auth-services/authentication.service';
import { User } from '../model/auth.model';
import { AuthState, AuthStateModel } from '../store/auth.state';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    @Select(AuthState) authState$: Observable<AuthStateModel>;

    user: User | null;

    authActive = false;

    isCheckingGuard = false;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      this.isCheckingGuard = true;
      this.authState$.pipe(takeWhile(() => this.isCheckingGuard))
      .subscribe((state) => {
        this.user = state.userData;
      });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(this.user?.token);
        if (this.user?.token) {
            // logged
            return true;
        } else {
          // not logged
          this.router.navigate(['/home/welcome']);
          return false;
        }

    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }

}
