import { TestBed } from '@angular/core/testing';

import { CaseTypeService } from './case-type.service';

describe('CaseTypeService', () => {
  let service: CaseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
