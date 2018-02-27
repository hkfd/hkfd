import { NgModule } from '@angular/core';

import { MockApiService } from './api.service.mock';
import { MockTitleService } from './title.service.mock';

export { MockApiService } from './api.service.mock';
export { MockTitleService } from './title.service.mock';

@NgModule({
  declarations: [MockApiService, MockTitleService],
  exports: []
})
export class TestingModule {}
