import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { CareersComponent } from './careers.component';
import { CareerComponent } from './career/career.component';

const routes: Routes = [
  {
    path: '',
    component: CareersComponent,
    data: {
      state: 'careers'
    }
  },
  {
    path: ':id',
    component: CareerComponent,
    data: {
      state: 'career'
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CareersComponent, CareerComponent]
})
export class CareersModule {}
