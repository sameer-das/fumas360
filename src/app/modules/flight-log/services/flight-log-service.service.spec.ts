import { TestBed } from '@angular/core/testing';

import { FlightLogServiceService } from './flight-log-service.service';

describe('FlightLogServiceService', () => {
  let service: FlightLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
