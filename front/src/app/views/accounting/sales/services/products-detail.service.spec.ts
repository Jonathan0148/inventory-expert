import { TestBed } from '@angular/core/testing';

import { ProductsDetailService } from './products-detail.service';

describe('ProductsDetailService', () => {
  let service: ProductsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
