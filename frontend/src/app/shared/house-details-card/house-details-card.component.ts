import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../auth/model/auth.model';
import { AuthState, AuthStateModel } from '../../auth/store/auth.state';
import { House } from '../model/house.model';

@Component({
  selector: 'app-house-details-card',
  templateUrl: './house-details-card.component.html',
  styleUrls: ['./house-details-card.component.scss']
})
export class HouseDetailsCardComponent implements OnInit, OnDestroy {

  serverApiUrl = environment.apiBaseUrl + '/';

  @Input() houseDetais: House;

  @Output() deleteButtonClicked = new EventEmitter<string>();
  @Output() modifyButtonClicked = new EventEmitter<string>();

  @Select(AuthState) authState$: Observable<AuthStateModel>;

  user: User | null;

  componentActive = false;



  constructor() {
    this.componentActive = true;
    this.authState$.pipe(takeWhile(() => this.componentActive))
    .subscribe((state) => {
      this.user = state.userData;
    });
  }

  ngOnInit(): void {
  }

  canModify(): boolean {
    return this.user?.userId === this.houseDetais?.userId;
  }

  deleteUserAnnouncement(): void {
    this.deleteButtonClicked.emit(this.houseDetais.houseId);
  }

  modifyUserAnnouncement(): void {
    this.modifyButtonClicked.emit(this.houseDetais.houseId);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}

