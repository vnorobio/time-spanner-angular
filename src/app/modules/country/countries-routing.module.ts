import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CountryTableComponent} from './country-table/country-table.component';
import {CountryAddComponent} from './country-add/country-add.component';

const routes: Routes = [
  {path: '', component: CountryTableComponent},
  {path: 'add', component: CountryAddComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
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
