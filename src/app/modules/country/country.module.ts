import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryService} from '../../domain/country/country.service';
import {CustomMaterialModule} from '../../custom-material/custom-material.module';
import {CountryTableComponent} from './country-table/country-table.component';
import {CountriesRoutingModule} from './countries-routing.module';



@NgModule({
  declarations: [
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    CountriesRoutingModule
  ],
  providers: [
    CountryService
  ]
})
export class CountryModule { }
