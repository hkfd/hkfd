export { TransferState } from '@angular/platform-browser';

export class MockTransferState {
  data: any = {};

  constructor() {
    this.get = spyOn(this, 'get').and.callThrough();
    this.set = spyOn(this, 'set').and.callThrough();
  }

  get(key: string, defaultReturn: any) {
    if (this.data[key]) return this.data[key];

    return defaultReturn;
  }

  set(key: string, data: {}) {
    this.data[key] = data;
  }
}
