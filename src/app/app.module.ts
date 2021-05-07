import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import { HomeComponent } from './modules/home/home.component';
import { CountryComponent } from './modules/country/country.component';
import {CountryService} from './domain/country/country.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
