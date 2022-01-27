import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-preview',
  templateUrl: './house-preview.component.html',
  styleUrls: ['./house-preview.component.scss']
})
export class HousePreviewComponent implements OnInit {

  @Input() previewImgUrl: string;
  @Input() houseName: string;
  @Input() houseTown: string;
  @Input() houseId: string;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  navigate(): void {
    this.router.navigateByUrl(`/home/house/${this.houseId}`);
  }
}
