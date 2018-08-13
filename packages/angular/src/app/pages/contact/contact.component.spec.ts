import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, MockMetaService, MockApiPipe } from 'testing';

import { MetaService } from 'shared';
import { ContactImages } from './contact.images';
import { ContactComponent } from './contact.component';

let fixture: ComponentFixture<ContactComponent>;
let metaService: MetaService;
let apiPipe: jasmine.Spy;

describe('ContactComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ContactComponent, MockApiPipe],
      providers: [{ provide: MetaService, useClass: MockMetaService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call MetaService setMetaTags', () => {
    expect(metaService.setMetaTags).toHaveBeenCalled();
  });

  it('should call MetaService setMetaTags with title and url args', () => {
    expect(metaService.setMetaTags).toHaveBeenCalledWith({
      title: jasmine.any(String),
      url: jasmine.any(String)
    });
  });

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with contact image', () => {
    expect(apiPipe).toHaveBeenCalledWith(ContactImages.contact);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ContactComponent);
  metaService = fixture.debugElement.injector.get(MetaService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
