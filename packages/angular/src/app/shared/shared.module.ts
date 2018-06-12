import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './api.service';
import { PrismicService } from './prismic.service';
import { TitleService } from './title.service';
import { LoggerService } from './logger.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { SliderWorkComponent } from './slider/slider-work/slider-work.component';
import { ImageComponent } from './image/image.component';
import { FormComponent } from './form/form.component';
import { ImageBlockComponent } from './blocks/image-block/image-block.component';
import { DuoBlockComponent } from './blocks/duo-block/duo-block.component';
import { GalleryBlockComponent } from './blocks/gallery-block/gallery-block.component';
import { VideoBlockComponent } from './blocks/video-block/video-block.component';
import { AudioBlockComponent } from './blocks/audio-block/audio-block.component';
import { ApiPipe } from './pipes/api.pipe';
import { PrismicPipe } from './pipes/prismic.pipe';
import { LazyDirective } from './lazy.directive';

export { ApiService } from './api.service';
export { PrismicService } from './prismic.service';
export { TitleService } from './title.service';
export { LoggerService } from './logger.service';
export { ApiPipe } from './pipes/api.pipe';
export { PrismicPipe } from './pipes/prismic.pipe';
export { LazyDirective } from './lazy.directive';
export { Api } from '../../api/src/api';
export { Prismic } from './prismic';
export { Generic } from './generic';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
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
  providers: [ApiService, PrismicService, TitleService, LoggerService, ApiPipe]
})
export class SharedModule {}
