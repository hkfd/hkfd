import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PostResolver, PostComponent } from 'shared';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: ':type/:id',
    component: PostComponent,
    resolve: { post: PostResolver },
    data: {
      state: 'post'
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent]
})
export class HomeModule {}
