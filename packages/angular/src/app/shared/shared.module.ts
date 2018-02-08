import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ServerService } from './server.service';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [ServerService]
})
export class SharedModule {}
