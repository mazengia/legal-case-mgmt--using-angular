import { TestBed } from '@angular/core/testing';

import { MortgageTypeService } from './mortgage-type.service';

describe('MortgageTypeService', () => {
  let service: MortgageTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
