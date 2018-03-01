import { TestBed, async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { TitleService } from './title.service';

let titleService: TitleService;
let title: TitleStub;

describe('TitleService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [TitleService]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createService()));

  it('should call Title setTitle', () => {
    titleService.setTitle();

    expect(title.setTitle).toHaveBeenCalled();
  });

  it(`should call Title setTitle with 'Heckford –' if arg passed`, () => {
    titleService.setTitle('Title');

    expect(title.setTitle).toHaveBeenCalledWith('Heckford – Title');
  });

  it(`should call Title setTitle with 'Heckford' if no arg passed`, () => {
    titleService.setTitle();

    expect(title.setTitle).toHaveBeenCalledWith('Heckford');
  });
});

function createService() {
  titleService = TestBed.get(TitleService);
  title = new TitleStub();
}

class TitleStub {
  setTitle: jasmine.Spy;

  constructor() {
    const title = TestBed.get(Title);

    this.setTitle = spyOn(title, 'setTitle').and.callThrough();
  }
}
