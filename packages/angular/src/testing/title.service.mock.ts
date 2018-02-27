export class MockTitleService {
  setTitleSpy: jasmine.Spy;

  constructor() {
    this.setTitleSpy = spyOn(this, 'setTitle').and.callThrough();
  }

  setTitle(title?: string) {
    return;
  }
}
