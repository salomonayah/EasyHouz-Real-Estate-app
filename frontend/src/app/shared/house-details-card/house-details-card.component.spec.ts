import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailsCardComponent } from './house-details-card.component';

describe('HouseDetailsCardComponent', () => {
  let component: HouseDetailsCardComponent;
  let fixture: ComponentFixture<HouseDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
