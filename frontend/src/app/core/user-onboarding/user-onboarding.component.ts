import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-onboarding',
  templateUrl: './user-onboarding.component.html',
  styleUrls: ['./user-onboarding.component.scss']
})
export class UserOnboardingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openAddForm(): void {
    this.router.navigate(['/main/add-new-posts']);
  }

}
