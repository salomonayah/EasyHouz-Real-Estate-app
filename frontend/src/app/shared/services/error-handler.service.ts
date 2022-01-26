import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../../auth/auth-services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  shouldErrorDisplay = true;
  userLastPage: string;

  constructor(
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService
  ) {}

  private showErrorToast(message: string, title: string): void {
    if (this.shouldErrorDisplay) {
      this.toastrService.error(message, title, {
        closeButton: true,
        progressBar: true,
      });
    }
  }

  handleError(error: any): void | Observable<never>  {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        const title = 'Authorization Required. Invalid or no access token';
        const message = 'Please sign in to continue';
        this.showErrorToast(message, title);
        this.authenticationService.logout();

      } else if (error.status === 403) {
        const title = 'Oops something went wrong while trying to identify you.';
        const message = 'Please sign in to continue';
        this.showErrorToast(message, title);
        this.authenticationService.logout();

      } else if (error.status === 400) {
        const message = 'Sorry, we couldn\'t find such data. Please try again';
        const title = 'Request Failed';
        this.showErrorToast(message, title);

      } else if (error.status === 500) {
        const errorMessage = 'Couldn\'t complete the current action. Please try later.';
        this.showErrorToast(errorMessage, '');

      } else if (error.status === 504 || error.status === 0) {
        const errorMessage = 'Please check your internet connection. Couldn\'t complete  the current  action. Please try later.';
        this.showErrorToast(errorMessage, '');

      }
      return throwError(error);
    }

  }
}
