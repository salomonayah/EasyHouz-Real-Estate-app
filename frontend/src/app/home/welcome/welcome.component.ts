import { Component, HostListener, OnInit } from '@angular/core';
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
  innerWidth: number;

  @HostListener('window:resize', ['$event'])
  private onResize(event?: any): void {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private homeService: HomeService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.onResize();
    this.fetchTopHomeAnnouncement();
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url)
    .then(e =>  !e ? this.toast.show('Please sign in to add a new house offer') : e )
    .catch(e =>  e );
  }

  fetchTopHomeAnnouncement(): void {
    const itemNumber = this.innerWidth < 780 ? 2 : 3;
    this.homeService.getAllHouse(1, itemNumber).subscribe(
      (resp) => {
        this.topHouseList = resp.data.announcements;
      }
    );
  }

}

