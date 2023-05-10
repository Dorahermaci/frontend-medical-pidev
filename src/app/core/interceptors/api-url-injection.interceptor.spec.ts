import { TestBed } from '@angular/core/testing';

import { ApiUrlInjectionInterceptor } from './api-url-injection.interceptor';

describe('ApiUrlInjectionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiUrlInjectionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiUrlInjectionInterceptor = TestBed.inject(ApiUrlInjectionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
