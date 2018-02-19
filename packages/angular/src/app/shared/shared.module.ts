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

export { ApiService } from './api.service';
export { TitleService } from './title.service';
export { LoggerService } from './logger.service';
export { Page } from './page';
export { Service } from './service';
export { CaseStudy } from './case-study';
export {
  Content,
  Data,
  TextBlock,
  ImageBlock,
  GalleryBlock,
  VideoBlock,
  AudioBlock
} from './content';
export { Image, Slider } from './images';
export { Team } from './team';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    ImageComponent,
    CloudinaryPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderWorkComponent,
    ImageComponent,
    CloudinaryPipe
  ],
  providers: [ApiService, TitleService, LoggerService]
})
export class SharedModule {}
