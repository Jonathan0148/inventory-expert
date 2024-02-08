import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductsFormComponent } from './info-products-form.component';

describe('InfoProductsFormComponent', () => {
  let component: InfoProductsFormComponent;
  let fixture: ComponentFixture<InfoProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProductsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
