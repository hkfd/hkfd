import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PostComponent } from './post.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { GalleryBlockComponent } from './gallery-block/gallery-block.component';
import { ImageBlockComponent } from './image-block/image-block.component';
import { VideoBlockComponent } from './video-block/video-block.component';
import { AudioBlockComponent } from './audio-block/audio-block.component';

const routes: Routes = [{ path: '', component: PostComponent }];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [
    PostComponent,
    TextBlockComponent,
    GalleryBlockComponent,
    ImageBlockComponent,
    VideoBlockComponent,
    AudioBlockComponent
  ]
})
export class PostModule {}
