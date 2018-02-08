import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ServerService } from './server.service';

export { HeaderComponent } from './header/header.component';
export { ServerService } from './server.service';
export { Page } from './page';
export { Service } from './service';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [ServerService]
})
export class SharedModule {}
