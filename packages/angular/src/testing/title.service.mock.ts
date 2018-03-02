export class MockTitleService {
  constructor() {
    this.setTitle = spyOn(this, 'setTitle').and.callThrough();
  }

  setTitle(title?: string) {
    return;
  }
}
