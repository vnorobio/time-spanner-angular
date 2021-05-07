import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CountryTableComponent} from './country-table/country-table.component';

const routes: Routes = [
  {path: '', component: CountryTableComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class CountriesRoutingModule{

}
