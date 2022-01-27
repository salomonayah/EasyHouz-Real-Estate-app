import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { User } from '../../auth/model/auth.model';
import { AuthState, AuthStateModel } from '../../auth/store/auth.state';
import { House } from '../../shared/model/house.model';
import { UserDashboardService } from '../service/user-dashboard.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit , OnDestroy {

  @Select(AuthState) authState$: Observable<AuthStateModel>;

  user: User | null;

  componentActive = false;

  userHouseList: House[] = [];

  constructor(
    private router: Router,
    private userDashboardService: UserDashboardService,
  ) {
  }

  ngOnInit(): void {
    this.componentActive = true;
    this.authState$.pipe(takeWhile(() => this.componentActive))
    .subscribe((state) => {
      this.user = state.userData;
      this.fetchAnnouncementByUserId();
    });
  }

  openAddForm(): void {
    this.router.navigate(['/main/add-new-posts']);
  }

  fetchAnnouncementByUserId(): void {
    const userId = this.user?.userId || '';

    this.userDashboardService.getHouseByUserId(userId , 1, 3).subscribe(
      (resp) => {
        this.userHouseList = resp.data.announcements;
      }
    );
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }


  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
