import { TestBed } from '@angular/core/testing';

import { FormExitGuard } from './form-exit.guard';

describe('FormExitGuard', () => {
  let guard: FormExitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormExitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
