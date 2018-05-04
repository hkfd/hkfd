import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'server'
})
export class MockServerPipe implements PipeTransform {
  transform(val: any): any {
    return val;
  }
}
