import { MetaTags } from 'shared';

export class MockMetaService {
  constructor() {
    jest.spyOn(this, 'setMetaTags');
  }

  setMetaTags(_tags: Partial<MetaTags>) {
    return;
  }
}
