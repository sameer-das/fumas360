import { TestBed } from '@angular/core/testing';

import { FlightLogService } from './flight-log.service';

describe('FlightLogService', () => {
  let service: FlightLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
