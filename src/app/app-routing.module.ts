import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {MenuService} from './domain/menu/menu.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'countries', loadChildren: () => import('./modules/country/country.module').then(importObj => importObj.CountryModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MenuService]
})
export class AppRoutingModule { }
