import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';
import { House } from '../../shared/model/house.model';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  topHouseList: House[] = [];

  serverApiUrl = environment.apiBaseUrl + '/';

  constructor(
    private homeService: HomeService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchTopHomeAnnouncement();
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url)
    .then(e =>  !e ? this.toast.show('Please sign in to add a new house offer') : e )
    .catch(e =>  e );
  }

  fetchTopHomeAnnouncement(): void {
    this.homeService.getAllHouse(1, 3).subscribe(
      (resp) => {
        this.topHouseList = resp.data.announcements;
      }
    );
  }

}

