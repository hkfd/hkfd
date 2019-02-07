import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prismic'
})
export class MockPrismicPipe implements PipeTransform {
  transform(val: any): any {
    return { 'mock-prismic-pipe': val };
  }
}
