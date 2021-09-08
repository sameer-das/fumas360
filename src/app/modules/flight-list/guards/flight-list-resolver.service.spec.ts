import { TestBed } from '@angular/core/testing';

import { FlightListResolverService } from './flight-list-resolver.service';

describe('FlightListResolverService', () => {
  let service: FlightListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
