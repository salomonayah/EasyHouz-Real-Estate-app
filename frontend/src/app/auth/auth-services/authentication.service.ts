import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../model/auth.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      if (localStorage.getItem('user')) {
        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') as string));
        this.user = this.userSubject.asObservable();
      }
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
        }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/home']);
    }
}
