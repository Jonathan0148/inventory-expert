import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStoreComponent } from './form-store.component';

describe('FormStoreComponent', () => {
  let component: FormStoreComponent;
  let fixture: ComponentFixture<FormStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
