import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AuthenticationService } from '../../../auth/auth-services/authentication.service';
import { AuthState, AuthStateModel } from '../../../auth/store/auth.state';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy, OnInit {

  @Select(AuthState) authState$: Observable<AuthStateModel>;

  isLoggedIn = false;

  authActive = false;

  componentIsActive = true;

  componentToDisplay: 'SignIn' | 'SignUp';

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authState$.pipe(takeWhile(() => this.componentIsActive))
    .subscribe((state) => {
      // console.log('isLoggedIn$');
      // console.log(state);
      this.isLoggedIn = state.isLoggedIn;
    });
  }


  openSignIn(): void {
    this.authActive = true;
    this.componentToDisplay = 'SignIn';
  }

  openSignup(): void  {
    this.authActive = true;
    this.componentToDisplay = 'SignUp';
  }

  signOut(): void {
    this.authenticationService.logout();
    this.authActive = false;
  }

  ngOnDestroy(): void {
    this.authActive = false;
    this.componentIsActive = false;
  }

}
