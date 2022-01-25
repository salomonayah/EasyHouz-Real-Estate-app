import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
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
      private store: Store
  ) {

    this.store.select(state => state.AuthState).subscribe(
      (data: AuthStateModel) => {
        this.userSubject = new BehaviorSubject<User | null>(data.userData);
      }
    );

  }

  public get userValue(): User | null {
      return this.userSubject.value;
  }

  login(username: string, password: string): Observable<User> {
      return this.http.post<User>(`${environment.apiBaseUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
              this.store.dispatch(new SetUserData(user));
              this.store.dispatch(new SetIsLoggedIn(true));
              this.userSubject.next(user);

              return user;
      }));
  }

  logout(): void {
      // remove user from local storage to log user out
      // localStorage.removeItem('user');
      this.store.dispatch(new SetUserData(null));
      this.store.dispatch(new SetIsLoggedIn(false));

      // Using subject here: in case any component want to get user data directly form this service
      this.userSubject.next(null);

      this.router.navigate(['/home']);
  }
}
