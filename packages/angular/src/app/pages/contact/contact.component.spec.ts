import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, MockTitleService } from '../../../testing';

import { TitleService } from '../../shared/shared.module';
import { ContactComponent } from './contact.component';

let comp: ContactComponent;
let fixture: ComponentFixture<ContactComponent>;
let titleService: TitleService;

describe('ContactComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ContactComponent],
        providers: [{ provide: TitleService, useClass: MockTitleService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(jasmine.any(String));
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ContactComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
