import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { House } from '../../shared/model/house.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllHouse(): Observable<House[]> {
    return this.http.get<House[]>(`/api/houses`);
  }

  getHouseById(houseId: string): Observable<House[]> {
    return this.http.get<House[]>(`/api/houses/${houseId}`);
  }

}
