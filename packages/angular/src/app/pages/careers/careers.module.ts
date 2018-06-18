import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CareerResolver } from './career-resolver.service';
import { CareersComponent } from './careers.component';
import { CareerComponent } from './career/career.component';

const routes: Routes = [
  { path: '', component: CareersComponent },
  {
    path: ':id',
    component: CareerComponent,
    resolve: { career: CareerResolver }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CareersComponent, CareerComponent],
  providers: [CareerResolver]
})
export class CareersModule {}
