import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'shared/shared.module';
import { NewsPostResolver } from './news-post-resolver.service';
import { NewsComponent } from './news.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { TextBlockComponent } from './news-post/text-block/text-block.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  {
    path: ':uid',
    component: NewsPostComponent,
    resolve: { post: NewsPostResolver },
    data: {
      state: 'post'
    }
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [NewsComponent, NewsPostComponent, TextBlockComponent],
  providers: [NewsPostResolver]
})
export class NewsModule {}
