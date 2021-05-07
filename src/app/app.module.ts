import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import { HomeComponent } from './modules/home/home.component';
import {CountryService} from './domain/country/country.service';
import {HttpClientModule} from '@angular/common/http';
import {CountryModule} from './modules/country/country.module';
import { MenuListItemComponent } from './modules/menu-list-item/menu-list-item.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    CountryModule,
    FlexLayoutModule
  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
