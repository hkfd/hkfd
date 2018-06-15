export class MockFormService {
  sendEmail({
    name,
    email,
    message
  }: {
    name: string;
    email: string;
    message: string;
  }): Promise<Object> {
    if (!name || !email || !message) return Promise.reject(null);

    return Promise.resolve(null);
  }
}
