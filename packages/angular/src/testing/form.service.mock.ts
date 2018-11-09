export class MockFormService {
  constructor() {
    this.sendEmail = spyOn(this, 'sendEmail').and.callThrough();
  }

  sendEmail(): Promise<Object> {
    return Promise.resolve({});
  }
}
