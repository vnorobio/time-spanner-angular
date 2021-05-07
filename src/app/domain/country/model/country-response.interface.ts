import {Country} from './country.model';

export interface CountryResponse{
  count?: number;
  content: Country[] | Country;
  status: string;
  timestamp: string;
}
