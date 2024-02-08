import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsFormComponent } from './list-products-form.component';

describe('ListProductsFormComponent', () => {
  let component: ListProductsFormComponent;
  let fixture: ComponentFixture<ListProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
