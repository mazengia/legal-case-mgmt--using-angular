import { TestBed } from '@angular/core/testing';

import { MailNotificationTypeService } from './mail-notification-type.service';

describe('MailNotificationTypeService', () => {
  let service: MailNotificationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailNotificationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
