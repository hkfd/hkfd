import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WorkComponent } from './work.component';
import { CaseStudyComponent } from './case-study/case-study.component';

const routes: Routes = [
  { path: '', component: WorkComponent },
  { path: ':id', component: CaseStudyComponent }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent, CaseStudyComponent]
})
export class WorkModule {}
