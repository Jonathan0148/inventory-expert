import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsCategoriesComponent } from './fields-categories.component';

describe('FieldsCategoriesComponent', () => {
  let component: FieldsCategoriesComponent;
  let fixture: ComponentFixture<FieldsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
