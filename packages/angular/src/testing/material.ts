export class StubMatSnackBar {
  constructor() {
    jest.spyOn(this, 'open');
  }

  open() {
    return {
      onAction: jest.fn().mockReturnValue('onAction')
    };
  }
}
