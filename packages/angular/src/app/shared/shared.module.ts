import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { SliderWorkComponent } from './slider/slider-work/slider-work.component';
import { ImageComponent } from './image/image.component';
import { FormComponent } from './form/form.component';
import { TextBlockComponent } from './blocks/text-block/text-block.component';
import { TextComponent } from './blocks/text-block/text/text.component';
import { ImageBlockComponent } from './blocks/image-block/image-block.component';
import { DuoBlockComponent } from './blocks/duo-block/duo-block.component';
import { GalleryBlockComponent } from './blocks/gallery-block/gallery-block.component';
import { VideoBlockComponent } from './blocks/video-block/video-block.component';
import { AudioBlockComponent } from './blocks/audio-block/audio-block.component';
import { ApiPipe } from './pipes/api.pipe';
import { PrismicPipe } from './pipes/prismic.pipe';
import { LazyDirective } from './lazy.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [
    PostComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    TextBlockComponent,
    TextComponent,
    ImageBlockComponent,
    DuoBlockComponent,
    GalleryBlockComponent,
    VideoBlockComponent,
    AudioBlockComponent,
    ImageComponent,
    FormComponent,
    LazyDirective,
    ApiPipe,
    PrismicPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    TextBlockComponent,
    ImageBlockComponent,
    DuoBlockComponent,
    GalleryBlockComponent,
    VideoBlockComponent,
    AudioBlockComponent,
    ImageComponent,
    FormComponent,
    LazyDirective,
    ApiPipe,
    PrismicPipe
  ],
  providers: [ApiPipe]
})
export class SharedModule {}
