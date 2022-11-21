import { TestBed } from '@angular/core/testing';

import { LitigationService } from './litigation.service';

describe('LitigationService', () => {
  let service: LitigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LitigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
