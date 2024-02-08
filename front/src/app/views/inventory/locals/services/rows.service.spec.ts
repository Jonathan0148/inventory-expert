import { TestBed } from '@angular/core/testing';

import { RowsService } from './rows.service';

describe('RowsService', () => {
  let service: RowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
