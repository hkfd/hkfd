import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { RavenErrorHandler } from './raven';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RoutingModule
  ],
  providers: [Title, { provide: ErrorHandler, useClass: RavenErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}
