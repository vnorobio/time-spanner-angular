import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from './country/model/country.model';
import {Observable} from 'rxjs';

interface Response{
  count?: number;
  content: Country[] | Country;
  status: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'http://localhost:8084/api/v1';
  constructor(private httpClient: HttpClient) {
  }

  findAllCountries(): Observable<Response>{
   return this.httpClient.get<Response>(`${this.baseUrl}/countries`);
  }

}
