import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { PostResolver, PostComponent } from 'shared';
import { WorkComponent } from './work.component';

const routes: Routes = [
  { path: '', component: WorkComponent },
  {
    path: ':id',
    component: PostComponent,
    resolve: { post: PostResolver },
    data: {
      state: 'post'
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [WorkComponent]
})
export class WorkModule {}
