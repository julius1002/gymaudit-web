import { TestBed } from '@angular/core/testing';

import { LogSetServiceService } from './log-set-service.service';

describe('LogSetServiceService', () => {
  let service: LogSetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogSetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
