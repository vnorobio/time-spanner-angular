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
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import {ErrorHandlerModule} from './modules/errors/error-handler.module';
import {NotificationService} from './shared/services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuListItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomMaterialModule,
    CountryModule,
    FlexLayoutModule,
    ErrorHandlerModule
  ],
  providers: [
    CountryService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
