import { TestBed } from '@angular/core/testing';

import { JudicialReportService } from './judicial-report.service';

describe('JudicialReportService', () => {
  let service: JudicialReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudicialReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
