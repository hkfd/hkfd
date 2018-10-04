export { TransferState } from '@angular/platform-browser';

export class MockTransferState {
  data: any = {};

  get(key: string, defaultReturn: any) {
    if (this.data[key]) return this.data[key];

    return defaultReturn;
  }

  set(key: string, data: {}) {
    this.data[key] = data;
  }
}
