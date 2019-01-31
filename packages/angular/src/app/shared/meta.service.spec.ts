import { TestBed, async } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { LoggerService, MockLoggerService } from 'testing';
import { MetaService } from './meta.service';

let metaService: MetaService;
let meta: Meta;
let title: Title;

describe('MetaService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [
        MetaService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(metaService).toBeTruthy();
  });

  describe('`setMetaTags`', () => {
    describe('args', () => {
      describe('`type`', () => {
        it('should call `Meta` `updateTag` with `og:type` and `type` args if passed', () => {
          metaService.setMetaTags({ type: 'article' });

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:type',
            content: 'article'
          });
        });

        it('should call `Meta` `updateTag` with `og:type` and `website` args if not passed', () => {
          metaService.setMetaTags({});

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:type',
            content: 'website'
          });
        });
      });

      describe('`title`', () => {
        describe('Is passed', () => {
          beforeEach(() => metaService.setMetaTags({ title: 'Title' }));

          it('should call `Title` `setTitle` with `Heckford – {title}` arg', () => {
            expect(title.setTitle).toHaveBeenCalledWith('Heckford – Title');
          });

          it('should call `Meta` `updateTag` with `og:title` and `title` args', () => {
            expect(meta.updateTag).toHaveBeenCalledWith({
              property: 'og:title',
              content: 'Title'
            });
          });
        });

        describe('Is not passed', () => {
          beforeEach(() => metaService.setMetaTags({}));

          it('should call `Title` `setTitle` with `Heckford` arg', () => {
            expect(title.setTitle).toHaveBeenCalledWith('Heckford');
          });

          it('should call `Meta` `updateTag` with `og:title` and `Heckford` arg', () => {
            metaService.setMetaTags({});

            expect(meta.updateTag).toHaveBeenCalledWith({
              property: 'og:title',
              content: 'Heckford'
            });
          });
        });
      });

      describe('`description`', () => {
        describe('Is passed', () => {
          beforeEach(() =>
            metaService.setMetaTags({ description: 'Description.' })
          );

          it('should call `Meta` `updateTag` with `description` and `description` args', () => {
            expect(meta.updateTag).toHaveBeenCalledWith({
              name: 'description',
              content: 'Description.'
            });
          });

          it('should call `Meta` `updateTag` with `og:description` and `description` args', () => {
            expect(meta.updateTag).toHaveBeenCalledWith({
              property: 'og:description',
              content: 'Description.'
            });
          });
        });

        describe('Is not passed', () => {
          beforeEach(() => metaService.setMetaTags({}));

          it('should call `Meta` `updateTag` with `description` and `Independent advertising...` args', () => {
            expect(meta.updateTag).toHaveBeenCalledWith({
              name: 'description',
              content: 'Independent advertising & marketing agency'
            });
          });

          it('should call `Meta` `updateTag` with `og:description` and `Independent advertising...` args', () => {
            expect(meta.updateTag).toHaveBeenCalledWith({
              property: 'og:description',
              content: 'Independent advertising & marketing agency'
            });
          });
        });
      });

      describe('`image`', () => {
        it('should call `Meta` `updateTag` with `og:image` and `image` args if passed', () => {
          metaService.setMetaTags({ image: 'image.jpg' });

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:image',
            content: 'image.jpg'
          });
        });

        it('should call `Meta` `updateTag` with `og:image` and combined `environment.deployUrl` fallback image args if not passed', () => {
          metaService.setMetaTags({});

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:image',
            content: 'https://testing/assets/heckford.png'
          });
        });
      });

      describe('`url`', () => {
        it('should call `Meta` `updateTag` with `og:url` and combined `environment.deployUrl` `url` args if passed', () => {
          metaService.setMetaTags({ url: 'page' });

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:url',
            content: 'https://testing/page'
          });
        });

        it('should call `Meta` `updateTag` with `og:url` and `environment.deployUrl` args if not passed', () => {
          metaService.setMetaTags({});

          expect(meta.updateTag).toHaveBeenCalledWith({
            property: 'og:url',
            content: 'https://testing/'
          });
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
