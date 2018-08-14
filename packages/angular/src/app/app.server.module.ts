import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { environment } from 'environment';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.deployUrl }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
