import { TestBed, async } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { MetaService } from './meta.service';

let metaService: MetaService;
let meta: MetaStub;
let title: TitleStub;

describe('MetaService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [MetaService]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(metaService).toBeTruthy();
  });

  it('should call Title setTitle', () => {
    metaService.setMetaTags({});

    expect(title.setTitle).toHaveBeenCalled();
  });

  it('should call Title setTitle with `Heckford – {title}` if title arg', () => {
    metaService.setMetaTags({ title: 'Title' });

    expect(title.setTitle).toHaveBeenCalledWith('Heckford – Title');
  });

  it('should call Title setTitle with `Heckford` if no title arg', () => {
    metaService.setMetaTags({});

    expect(title.setTitle).toHaveBeenCalledWith('Heckford');
  });

  it('should call Meta updateTag with `og:type` and `type` args if passed type', () => {
    metaService.setMetaTags({ type: 'article' });

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:type',
      content: 'article'
    });
  });

  it('should call Meta updateTag with `og:type` and `website` args if not passed type', () => {
    metaService.setMetaTags({});

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:type',
      content: 'website'
    });
  });

  it('should call Meta updateTag with `og:title` and `title` args if passed title', () => {
    metaService.setMetaTags({ title: 'Title' });

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Title'
    });
  });

  it('should call Meta updateTag with `og:title` and `website` args if not passed title', () => {
    metaService.setMetaTags({});

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Heckford'
    });
  });

  it('should call Meta updateTag with `og:description` and `description` args if passed description', () => {
    metaService.setMetaTags({ description: 'Description.' });

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Description.'
    });
  });

  it('should call Meta updateTag with `og:description` and `Independent advertising...` args if not passed description', () => {
    metaService.setMetaTags({});

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Independent advertising & marketing agency'
    });
  });

  it('should call Meta updateTag with `og:url` and combined `environment.deployUrl` `url` args if passed url', () => {
    metaService.setMetaTags({ url: 'page' });

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: 'https://testing/page'
    });
  });

  it('should call Meta updateTag with `og:url` and `environment.deployUrl` args if not passed url', () => {
    metaService.setMetaTags({});

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: 'https://testing/'
    });
  });

  it('should call Meta updateTag with `og:image` and combined `environment.deployUrl` `image` args if passed image', () => {
    metaService.setMetaTags({ image: 'image.jpg' });

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'image.jpg'
    });
  });

  it('should call Meta updateTag with `og:image` and combined `environment.deployUrl` fallback image args if not passed image', () => {
    metaService.setMetaTags({});

    expect(meta.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'https://testing/assets/heckford.png'
    });
  });
});

class TitleStub {
  setTitle: jasmine.Spy;

  constructor() {
    const titleInstance = TestBed.get(Title);

    this.setTitle = spyOn(titleInstance, 'setTitle').and.callThrough();
  }
}

class MetaStub {
  updateTag: jasmine.Spy;

  constructor() {
    const metaInstance = TestBed.get(Meta);

    this.updateTag = spyOn(metaInstance, 'updateTag').and.callThrough();
  }
}

function createService() {
  metaService = TestBed.get(MetaService);
  meta = new MetaStub();
  title = new TitleStub();
}
