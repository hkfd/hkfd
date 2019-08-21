import { TestBed, async } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { createTitle, createMetaTags } from './meta.service.helpers';
import { MetaService } from './meta.service';

let metaService: MetaService;
let meta: Meta;
let title: Title;

jest.mock('./meta.service.helpers', () => ({
  createTitle: jest.fn().mockReturnValue('createTitleReturn'),
  createMetaTags: jest.fn().mockReturnValue({
    type: 'type',
    title: 'title',
    description: 'description',
    image: 'image',
    url: 'url'
  })
}));

describe('MetaService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [MetaService]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(metaService).toBeTruthy();
  });

  describe('`setMetaTags`', () => {
    describe('`tags` is `undefined`', () => {
      beforeEach(() => metaService.setMetaTags(undefined));

      it('should not call `createTitle`', () => {
        expect(createTitle).not.toHaveBeenCalled();
      });

      it('should not call `createMetaTags`', () => {
        expect(createMetaTags).not.toHaveBeenCalled();
      });
    });

    describe('`tags` is `MetaTags`', () => {
      beforeEach(() => metaService.setMetaTags('tags' as any));

      it('should call `createTitle` with `tags` arg', () => {
        expect(createTitle).toHaveBeenCalledWith('tags');
      });

      it('should call `Title` `setTitle` with `createTitle` return arg', () => {
        expect(title.setTitle).toHaveBeenCalledWith('createTitleReturn');
      });

      it('should call `createMetaTags` with `tags` arg', () => {
        expect(createMetaTags).toHaveBeenCalledWith('tags');
      });

      it('should call `Meta` `updateTag` with `description` and `createMetaTags` `description` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          name: 'description',
          content: 'description'
        });
      });

      it('should call `Meta` `updateTag` with `og:type` and `createMetaTags` `type` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          property: 'og:type',
          content: 'type'
        });
      });

      it('should call `Meta` `updateTag` with `og:title` and `createMetaTags` `title` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          property: 'og:title',
          content: 'title'
        });
      });

      it('should call `Meta` `updateTag` with `og:description` and `createMetaTags` `description` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          property: 'og:description',
          content: 'description'
        });
      });

      it('should call `Meta` `updateTag` with `og:image` and `createMetaTags` `image` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          property: 'og:image',
          content: 'image'
        });
      });

      it('should call `Meta` `updateTag` with `og:url` and `createMetaTags` `url` return args', () => {
        expect(meta.updateTag).toHaveBeenCalledWith({
          property: 'og:url',
          content: 'url'
        });
      });
    });
  });
});

function createService() {
  metaService = TestBed.get(MetaService);
  meta = TestBed.get(Meta);
  jest.spyOn(meta, 'updateTag');
  title = TestBed.get(Title);
  jest.spyOn(title, 'setTitle');
}
