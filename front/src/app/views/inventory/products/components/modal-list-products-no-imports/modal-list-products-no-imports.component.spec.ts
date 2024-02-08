import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListProductsNoImportsComponent } from './modal-list-products-no-imports.component';

describe('ModalListProductsNoImportsComponent', () => {
  let component: ModalListProductsNoImportsComponent;
  let fixture: ComponentFixture<ModalListProductsNoImportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListProductsNoImportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListProductsNoImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
