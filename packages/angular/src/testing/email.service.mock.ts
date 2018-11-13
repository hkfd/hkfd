export class MockEmailService {
  constructor() {
    this.sendEmail = spyOn(this, 'sendEmail').and.callThrough();
  }

  sendEmail(): Promise<Object> {
    return Promise.resolve({});
  }
}
