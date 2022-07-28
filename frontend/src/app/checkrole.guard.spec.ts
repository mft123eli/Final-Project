import { TestBed } from '@angular/core/testing';

import { CheckroleGuard } from './checkrole.guard';

describe('CheckroleGuard', () => {
  let guard: CheckroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
