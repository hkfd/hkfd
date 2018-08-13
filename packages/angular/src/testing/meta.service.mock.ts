import { MetaTags } from 'shared';

export class MockMetaService {
  constructor() {
    this.setMetaTags = spyOn(this, 'setMetaTags').and.callThrough();
  }

  setMetaTags(_tags: Partial<MetaTags>) {
    return;
  }
}
