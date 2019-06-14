import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prismicText'
})
export class MockPrismicTextPipe implements PipeTransform {
  transform(val: any): any {
    return { 'mock-prismic-text-pipe': val };
  }
}
