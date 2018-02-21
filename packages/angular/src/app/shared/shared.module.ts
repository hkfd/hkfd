import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from './api.service';
import { TitleService } from './title.service';
import { LoggerService } from './logger.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { SliderWorkComponent } from './slider/slider-work/slider-work.component';
import { ImageComponent } from './image/image.component';
import { CloudinaryPipe } from './pipes/cloudinary.pipe';
import { LazyDirective } from './lazy.directive';

export { ApiService } from './api.service';
export { TitleService } from './title.service';
export { LoggerService } from './logger.service';
export { Page } from './page';
export { Post, Service, CaseStudy } from './post';
export {
  Content,
  Data,
  TextBlock,
  ImageBlock,
  GalleryBlock,
  VideoBlock,
  AudioBlock,
  Sentence,
  DuoBlock
} from './content';
export { Image, Slider, Lazy } from './images';
export { Team } from './team';
export { Career } from './career';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    ImageComponent,
    CloudinaryPipe,
    LazyDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    ImageComponent,
    CloudinaryPipe,
    LazyDirective
  ],
  providers: [ApiService, TitleService, LoggerService]
})
export class SharedModule {}
