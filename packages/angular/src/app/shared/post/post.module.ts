import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: ':type/:id',
    component: PostComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [PostComponent]
})
export class PostModule {}
