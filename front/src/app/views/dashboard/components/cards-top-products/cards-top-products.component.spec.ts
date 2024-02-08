import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTopProductsComponent } from './cards-top-products.component';

describe('CardsTopProductsComponent', () => {
  let component: CardsTopProductsComponent;
  let fixture: ComponentFixture<CardsTopProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTopProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTopProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
