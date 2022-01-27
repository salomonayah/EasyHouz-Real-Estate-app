import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { House, HouseList } from '../../shared/model/house.model';
import { TypedServerResponse } from '../../shared/model/shared.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllHouse(pageNumber: number , itemsPerPage: number ): Observable<TypedServerResponse<HouseList>> {
    return this.http.get<TypedServerResponse<HouseList>>(`/api/announcement/getAll?page=${pageNumber}&perPage=${itemsPerPage}`);
  }

  getHouseById(houseId: string): Observable<TypedServerResponse<House>> {
    return this.http.get<TypedServerResponse<House>>(`/api/announcement/single/${houseId}`);
  }

}
