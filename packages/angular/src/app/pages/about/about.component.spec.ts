import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockServerPipe,
  Data
} from '../../../testing';

import { TitleService, ApiService, Server } from '../../shared/shared.module';
import { AboutImages } from './about.images';
import { AboutComponent } from './about.component';

let comp: AboutComponent;
let fixture: ComponentFixture<AboutComponent>;
let titleService: TitleService;
let apiService: ApiService;
let serverPipe: jasmine.Spy;

describe('AboutComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AboutComponent, MockServerPipe],
        providers: [
          { provide: TitleService, useClass: MockTitleService },
          { provide: ApiService, useClass: MockApiService }
        ],
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

  it('should call ApiService getTeam', () => {
    expect(apiService.getTeam).toHaveBeenCalledWith();
  });

  it('should set team', () => {
    expect(comp.team).toBeDefined();
    expect(comp.team.length).toBe(5);
  });

  it('should call ServerPipe', () => {
    expect(serverPipe).toHaveBeenCalled();
  });

  it('should call ServerPipe with intro image', () => {
    expect(serverPipe).toHaveBeenCalledWith(AboutImages.intro);
  });

  it('should call ServerPipe with team thumbnails', () => {
    Data.Server.team.forEach(person =>
      expect(serverPipe).toHaveBeenCalledWith(person.thumbnail)
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AboutComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  serverPipe = spyOn(MockServerPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
