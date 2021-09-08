import { TestBed } from '@angular/core/testing';

import { FlightLogResolverService } from './flight-log-resolver.service';

describe('FlightLogResolverService', () => {
  let service: FlightLogResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightLogResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
