import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {MenuService} from './domain/menu/menu.service';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent},
  {path: 'countries', loadChildren: () => import('./modules/country/country.module').then(importObj => importObj.CountryModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MenuService]
})
export class AppRoutingModule { }
