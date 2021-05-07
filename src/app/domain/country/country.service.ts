import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CountryResponse} from './model/country-response.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'http://localhost:8084/api/v1';
  constructor(private httpClient: HttpClient) {
  }

  findAllCountries(pageNo: number = 0,
                   pageSize: number = 10,
                   sortBy: string = 'id',
                   sortOrder: string = 'asc',
                   filter: string = ''): Observable<CountryResponse>{
   return this.httpClient.get<CountryResponse>(`${this.baseUrl}/countries/paging`, {
     params: new HttpParams()
       .set('filter', filter)
       .set('pageNo', pageNo.toString())
       .set('pageSize', pageSize.toString())
       .set('sortBy', sortBy)
       .set('sortOrder', sortOrder)
   });
  }

}
