import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';
import { House } from '../../shared/model/house.model';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-all-houses',
  templateUrl: './all-houses.component.html',
  styleUrls: ['./all-houses.component.scss']
})
export class AllHousesComponent implements OnInit {

  houseList: House[] = [];

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
    this.homeService.getAllHouse(1, 9).subscribe(
      (resp) => {
        this.houseList = resp.data.announcements;
      }
    );
  }
}
