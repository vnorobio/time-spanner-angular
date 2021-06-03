import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CountryResponse} from './model/country-response.interface';
import {Observable, throwError} from 'rxjs';
import {Country} from './model/country.model';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class CountryService {

  private baseUrl = 'http://localhost:8084/api/v1';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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

  addCountry(data): Observable<Country> {
    return this.httpClient.post<Country>(`${this.baseUrl}/countries`, JSON.stringify(data), this.httpHeader);
  }

  deleteCountry(id): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/countries/${id}`, this.httpHeader);
  }

}
