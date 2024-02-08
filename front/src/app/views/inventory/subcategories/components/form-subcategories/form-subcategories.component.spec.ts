import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcategoriesComponent } from './form-subcategories.component';

describe('FormSubcategoriesComponent', () => {
  let component: FormSubcategoriesComponent;
  let fixture: ComponentFixture<FormSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
