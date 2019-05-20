import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { TextBlockComponent } from './news-post/text-block/text-block.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'page/:page', component: NewsComponent },
  {
    path: ':uid',
    component: NewsPostComponent,
    data: {
      state: 'post'
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [NewsComponent, NewsPostComponent, TextBlockComponent]
})
export class NewsModule {}
