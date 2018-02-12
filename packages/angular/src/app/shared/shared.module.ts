import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApiService } from './api.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { CloudinaryPipe } from './pipes/cloudinary.pipe';

export { ApiService } from './api.service';
export { Page } from './page';
export { Service } from './service';
export { CaseStudy } from './case-study';
export { Image, Slider } from './images';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CloudinaryPipe
  ],
  exports: [HeaderComponent, FooterComponent, SliderComponent, CloudinaryPipe],
  providers: [ApiService]
})
export class SharedModule {}
