import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiPipe
} from '../../../testing';

import { TitleService } from '../../shared/shared.module';
import { ContactImages } from './contact.images';
import { ContactComponent } from './contact.component';

let comp: ContactComponent;
let fixture: ComponentFixture<ContactComponent>;
let titleService: TitleService;
let apiPipe: jasmine.Spy;

describe('ContactComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ContactComponent, MockApiPipe],
      providers: [{ provide: TitleService, useClass: MockTitleService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(jasmine.any(String));
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
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
