import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PostComponent } from './post.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { TextComponent } from './text-block/text/text.component';

const routes: Routes = [{ path: '', component: PostComponent }];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [PostComponent, TextBlockComponent, TextComponent]
})
export class PostModule {}
