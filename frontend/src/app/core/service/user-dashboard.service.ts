import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { House, HouseList } from '../../shared/model/house.model';
import { TypedServerResponse } from '../../shared/model/shared.model';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient) { }

  getHouseByUserId(userId: string , pageNumber: number , itemsPerPage: number ): Observable<TypedServerResponse<HouseList>> {
    return this.http.get<TypedServerResponse<HouseList>>(`/api/announcement/getAll?page=${pageNumber}&perPage=${itemsPerPage}&userId=${userId}`);
  }

  createHouse(newHouse: FormData): Observable<House> {
    return this.http.post<House>('api/announcement/addNew', newHouse);
  }

  deleteUserHouse(houseId: string): Observable<any> {
    return this.http.delete(`api/announcement/remove/${houseId}`);
  }

  updateUserCourse(userId: string, houseId: string | number, newHouse: House): Observable<any> {
    return this.http.put(`api/${userId}/houses/${houseId}`, newHouse);
  }

}
