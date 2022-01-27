import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { House } from '../../shared/model/house.model';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-single-house',
  templateUrl: './single-house.component.html',
  styleUrls: ['./single-house.component.scss']
})
export class SingleHouseComponent implements OnInit {

  houseId: string;

  houseDetails: House;

  constructor(
      private homeService: HomeService,
      private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.houseId = this.route.snapshot.params.houseId;
    this.fetchHouseDetails(this.houseId);
  }

  fetchHouseDetails(houseId: string): void {
    this.homeService.getHouseById(houseId).subscribe(
      (resp) => {
        this.houseDetails = resp.data;
        console.log('this.houseDetails', this.houseDetails);
      }
    );
  }

}
