import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalErrorHandler} from './global-error-handler';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {CustomMaterialModule} from '../../custom-material/custom-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorHandlerModule {}
