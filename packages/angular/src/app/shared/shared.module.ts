import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from './api.service';
import { HeaderComponent } from './header/header.component';

export { ApiService } from './api.service';
export { Page } from './page';
export { Service } from './service';
export { CaseStudy } from './case-study';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [ApiService]
})
export class SharedModule {}
