import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {CountryComponent} from './modules/country/country.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', component: CountryComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
