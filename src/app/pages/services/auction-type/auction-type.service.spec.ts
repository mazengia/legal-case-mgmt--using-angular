import { TestBed } from '@angular/core/testing';

import { AuctionTypeService } from './auction-type.service';

describe('AuctionTypeService', () => {
  let service: AuctionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
