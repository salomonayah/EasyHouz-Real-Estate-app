import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { House } from '../../shared/model/house.model';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient) { }

  getHouseByUser(userId: string): Observable<House[]> {
    return this.http.get<House[]>(`/api/${userId}/houses`);
  }

  createHouse(newHouse: House): Observable<House> {
    return this.http.post<House>('/api/houses', newHouse);
  }

  deleteUserHouse(userId: string, houseId: string): Observable<any> {
    return this.http.delete(`/api/${userId}/houses/${houseId}`);
  }

  updateUserCourse(userId: string, houseId: string | number, newHouse: House): Observable<any> {
    return this.http.put(`/api/${userId}/houses/${houseId}`, newHouse);
  }

}
