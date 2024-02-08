import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBrandComponent } from './form-brand.component';

describe('FormBrandComponent', () => {
  let component: FormBrandComponent;
  let fixture: ComponentFixture<FormBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
