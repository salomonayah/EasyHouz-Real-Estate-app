import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypedServerResponse } from '../../shared/model/shared.model';
import { User } from '../model/auth.model';
import { SetIsLoggedIn, SetUserData } from '../store/auth.actions';
import { AuthStateModel } from '../store/auth.state';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  // Subject is not really necessary here since we are using the store
  // But, using subject here: in case any component want to get user data directly form this service
  private userSubject: BehaviorSubject<User | null>;

  constructor(
      private router: Router,
      private http: HttpClient,
      private store: Store,
      private toast: ToastrService
  ) {
    this.store.select(state => state.AuthState).subscribe(
      (data: AuthStateModel) => {
        this.userSubject =  new BehaviorSubject<User | null>(data?.userData);
      }
    );

  }

  public get userValue(): User | null {
      return this.userSubject.value;
  }

  login(email: string, password: string): Observable<User> {
      return this.http.post<TypedServerResponse<User>>('api/auth/login', { email, password })
      .pipe(map(resp => {

              this.toast.success(resp.message);
              this.store.dispatch(new SetUserData(resp.data));
              this.store.dispatch(new SetIsLoggedIn(true));
              this.userSubject.next(resp.data);

              return resp.data;
      }));
  }
  signUp(userData: User): Observable<User> {
      return this.http.post<TypedServerResponse<User>>('api/auth/signup', userData)
      .pipe(map((resp: TypedServerResponse<User>) => {
            this.toast.success(resp.message);
            this.store.dispatch(new SetUserData(resp.data));
            this.store.dispatch(new SetIsLoggedIn(true));
            this.userSubject.next(resp.data);

            return resp.data;
      }));
  }

  logout(): void {
      // remove user from local storage to log user out
      // localStorage.removeItem('user');
      this.store.dispatch(new SetUserData(null));
      this.store.dispatch(new SetIsLoggedIn(false));
      localStorage.clear();

      // Using subject here: in case any component want to get user data directly form this service
      this.userSubject.next(null);

      this.router.navigate(['/home/welcome']);
  }
}
