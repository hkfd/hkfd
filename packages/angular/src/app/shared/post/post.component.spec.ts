import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  Router,
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  ActivatedRoute,
  ActivatedRouteStub
} from '../../../testing';

import { TitleService, ApiService } from '../../shared/shared.module';
import { PostComponent } from './post.component';

let comp: PostComponent;
let fixture: ComponentFixture<PostComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;

describe('PostComponent', () => {
  beforeEach(
    async(() => {
      activatedRoute = new ActivatedRouteStub();

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [PostComponent],
        providers: [
          { provide: TitleService, useClass: MockTitleService },
          { provide: ApiService, useClass: MockApiService },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should call Router navigateByUrl on empty post', () => {
    expect(page.routerNavigateByUrl).toHaveBeenCalled();
  });

  it('should call Router navigateByUrl with root arg on empty post', () => {
    expect(page.routerNavigateByUrl).toHaveBeenCalledWith('/');
  });

  describe('OnInit', () => {
    beforeEach(() => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };
      fixture.detectChanges();
    });

    it('should call ApiService getPost', () => {
      expect(page.apiService.getPost).toHaveBeenCalled();
    });

    it('should call ApiService getPost with type and id args', () => {
      expect(page.apiService.getPost).toHaveBeenCalledWith(
        'work',
        'case-study-1'
      );
    });

    it('should set post', () => {
      expect(comp.post).toBeDefined();
      expect(comp.post.title).toBe('Case Study 1');
    });

    it('should call TitleService setTitle', () => {
      expect(page.titleService.setTitleSpy).toHaveBeenCalled();
    });

    it('should call TitleService setTitle with post title', () => {
      expect(page.titleService.setTitleSpy).toHaveBeenCalledWith(
        'Case Study 1'
      );
    });

    it('should set layout', () => {
      expect(comp.layout).toBeDefined();
    });

    it('should call ApiService getPost on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(page.apiService.getPost).toHaveBeenCalledTimes(3);
    });

    it('should set post again on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(comp.post.title).toBe('Case Study 2');
    });

    it('should not call Router navigateByUrl', () => {
      expect(page.routerNavigateByUrl).toHaveBeenCalledTimes(1);
    });
  });

  describe('randomInt', () => {
    it('should return numbers between min and max', () => {
      const numbers = Array(20)
        .fill(0)
        .map(() => comp.randomInt(1, 3));
      const isBetween = numbers.every(num => num >= 1 && num <= 3);

      expect(isBetween).toBe(true);
    });

    it('should not return identical numbers', () => {
      const unique = [];
      const numbers = Array(20)
        .fill(0)
        .map(() => comp.randomInt(1, 3));

      numbers.forEach(num => {
        if (!unique.includes(num)) return unique.push(num);
      });

      expect(unique.length).toBeGreaterThan(1);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class Page {
  titleService: MockTitleService;
  apiService: MockApiService;
  routerNavigateByUrl: jasmine.Spy;

  constructor() {
    const noop = () => undefined;
    const router = fixture.debugElement.injector.get(Router);
    (<any>this.titleService) = fixture.debugElement.injector.get(TitleService);
    (<any>this.apiService) = fixture.debugElement.injector.get(ApiService);

    this.routerNavigateByUrl = spyOn(router, 'navigateByUrl').and.callFake(
      noop
    );
  }
}
