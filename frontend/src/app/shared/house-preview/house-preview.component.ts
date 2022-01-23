import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-house-preview',
  templateUrl: './house-preview.component.html',
  styleUrls: ['./house-preview.component.scss']
})
export class HousePreviewComponent implements OnInit {

  @Input() previewImgUrl: string;
  @Input() houseName: string;
  @Input() houseTown: string;

  constructor() { }

  ngOnInit(): void {
  }

}
