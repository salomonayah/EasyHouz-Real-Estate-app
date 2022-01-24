import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnDestroy {

  authActive = false;
  componentToDisplay: 'SignIn' | 'SignUp';

  constructor() { }

  openSignIn(): void {
    this.authActive = true;
    this.componentToDisplay = 'SignIn';
  }

  openSignup(): void  {
    this.authActive = true;
    this.componentToDisplay = 'SignUp';
  }

  signOut(): void {
    this.authActive = true;
  }

  ngOnDestroy(): void {
    this.authActive = true;
  }

}


