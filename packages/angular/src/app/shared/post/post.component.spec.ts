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
let titleService: TitleService;
let apiService: ApiService;
let router: RouterStub;
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
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should call Router navigateByUrl with root arg on empty post', () => {
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  describe('OnInit', () => {
    beforeEach(() => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };
      fixture.detectChanges();
    });

    it('should call ApiService getPost', () => {
      expect(apiService.getPost).toHaveBeenCalled();
    });

    it('should call ApiService getPost with type and id args', () => {
      expect(apiService.getPost).toHaveBeenCalledWith('work', 'case-study-1');
    });

    it('should set post', () => {
      expect(comp.post).toBeDefined();
      expect(comp.post.title).toBe('Case Study 1');
    });

    it('should call TitleService setTitle', () => {
      expect(titleService.setTitle).toHaveBeenCalled();
    });

    it('should call TitleService setTitle with post title', () => {
      expect(titleService.setTitle).toHaveBeenCalledWith('Case Study 1');
    });

    it('should set layout', () => {
      expect(comp.layout).toBeDefined();
    });

    it(`should set layout as 'layout-'`, () => {
      expect(comp.layout).toMatch(/layout-[1-3]/);
    });

    it('should call ApiService getPost on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(apiService.getPost).toHaveBeenCalledTimes(3);
    });

    it('should set post again on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(comp.post.title).toBe('Case Study 2');
    });

    it('should not call Router navigateByUrl', () => {
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  router = new RouterStub();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class RouterStub {
  navigateByUrl: jasmine.Spy;

  constructor() {
    const noop = () => undefined;
    const router = fixture.debugElement.injector.get(Router);

    this.navigateByUrl = spyOn(router, 'navigateByUrl').and.callFake(noop);
  }
}
