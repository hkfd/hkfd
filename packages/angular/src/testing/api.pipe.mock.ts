import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'api'
})
export class MockApiPipe implements PipeTransform {
  transform(val: any): any {
    return val;
  }
}
