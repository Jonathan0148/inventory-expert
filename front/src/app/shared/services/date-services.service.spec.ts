import { TestBed } from '@angular/core/testing';

import { DateServicesService } from './date-services.service';

describe('DateServicesService', () => {
  let service: DateServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
