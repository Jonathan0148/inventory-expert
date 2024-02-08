import { TestBed } from '@angular/core/testing';

import { ProductsImportService } from './products-import.service';

describe('ProductsImportService', () => {
  let service: ProductsImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
