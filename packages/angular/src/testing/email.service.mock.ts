export class MockEmailService {
  constructor() {
    jest.spyOn(this, 'sendEmail');
  }

  sendEmail(): Promise<Object> {
    return Promise.resolve({});
  }
}
