import { NgModule, ErrorHandler } from '@angular/core';
import {
  BrowserModule,
  Title,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler, ErrorInterceptor } from './shared/errors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'hkfd' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RoutingModule
  ],
  providers: [
    Title,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
